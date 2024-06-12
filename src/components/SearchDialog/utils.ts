import type { Chunk, FindChunksArgs } from 'highlight-words-core';
import { findAll } from 'highlight-words-core';
import type { AllowedComponentProps, ComponentCustomProps, SetupContext, VNode, VNodeProps } from 'vue';
import { h } from 'vue';

export interface VueHighlighterProps {
  activeClassName?: string;
  activeIndex?: number;
  activeStyle?: Partial<CSSStyleDeclaration>;
  custom?: boolean;
  highlightClassName?: string;
  highlightStyle?: Partial<CSSStyleDeclaration>;
  onWordClick?: (textChunk: TextChunk) => void;
  onWordHover?: (textChunk: TextChunk) => void;
  autoEscape?: boolean;
  caseSensitive?: boolean;
  findChunks?: (args: FindChunksArgs) => Chunk[];
  sanitize?: (text: string) => string;
  searchWords: string[];
  textToHighlight: string;
}

export interface TextChunk {
  chunk: Chunk;
  text: string;
  attrs?: {
    class: string;
    key: number;
    highlightIndex: number;
    style: Partial<CSSStyleDeclaration>;
  };
}

/**
 * 在给定文本中查找所有搜索词的出现并使用指定样式进行高亮显示。
 * @param {VueHighlighterProps} props
 * @param {SetupContext} context
 * @returns {VNode}
 * 返回一个表示高亮文本的 Vue VNode。
 */
function VueHighlighterImpl(props: Readonly<VueHighlighterProps>, context: Omit<SetupContext, 'expose'>) {
  // 在文本中查找与搜索词匹配的所有块。
  const chunks = findAll({
    autoEscape: props.autoEscape,
    caseSensitive: props.caseSensitive,
    findChunks: props.findChunks,
    sanitize: props.sanitize,
    searchWords: props.searchWords,
    textToHighlight: props.textToHighlight,
  });

  // 获取表示高亮文本的子元素。
  const children = getTextChildren(props, chunks);

  // 检查是否提供了自定义插槽，如果有则返回。
  const slots = context.slots;
  if (slots.default) {
    return slots.default && slots.default(children);
  }

  // 如果没有自定义插槽，则创建一个带有提供的属性的 span 元素。
  return h(
    'span',
    { ...context.attrs },
    children.map(({ chunk, text, attrs }) => {
      // 如果块未高亮，则返回原始文本。
      if (!chunk.highlight) {
        return text;
      }
      const eventHandlers: any = {};
      if (props.onWordClick) {
        eventHandlers.onClick = () => props.onWordClick?.({ chunk, text, attrs });
      }
      if (props.onWordHover) {
        eventHandlers.onMouseover = () => props.onWordHover?.({ chunk, text, attrs });
      }
      // 如果块被高亮，则用指定的属性包装在 mark 元素中。
      return h('mark', { ...attrs, ...eventHandlers }, [text]);
    }),
  );
}

// 在没有提供样式的情况下定义一个空样式对象。
const EMPTY_STYLE = {};

/**
 * 从提供的块中提取文本子元素并应用高亮样式。
 * @param {VueHighlighterProps} props
 * @param {Chunk[]} chunks
 * @returns {TextChunk[]}
 * 返回一个带有高亮信息的文本块数组。
 */
function getTextChildren(props: VueHighlighterProps, chunks: Chunk[]): TextChunk[] {
  let highlightCount = -1;
  const {
    textToHighlight,
    highlightClassName,
    highlightStyle = EMPTY_STYLE,
    activeIndex,
    activeClassName,
    activeStyle = EMPTY_STYLE,
  } = props;

  return chunks.map((chunk, index) => {
    // 根据块的起始和结束位置从原始文本中提取文本。
    const text = textToHighlight.slice(chunk.start, chunk.end);
    // 如果块未高亮，则返回原始文本块。
    if (!chunk.highlight) {
      return { chunk, text };
    }
    // 递增高亮计数以跟踪当前活动的索引。
    highlightCount++;
    // 检查当前块是否是活动索引并应用相应的样式。
    const isActive = highlightCount === +(activeIndex || -1);
    // 定义用于高亮文本块的属性。
    const attrs = {
      class: `${highlightClassName} ${isActive ? activeClassName : ''}`,
      key: index,
      style: isActive && activeStyle != null ? { ...highlightStyle, ...activeStyle } : highlightStyle,
      highlightIndex: highlightCount,
    };

    return { chunk, text, attrs };
  });
}

// 定义组件属性及其类型。
VueHighlighterImpl.props = {
  activeClassName: String,
  activeIndex: Number,
  activeStyle: Object,
  autoEscape: Boolean,
  caseSensitive: {
    type: Boolean,
    default: false,
  },
  findChunks: Function,
  custom: {
    type: Boolean,
    default: false,
  },
  highlightClassName: String,
  highlightStyle: Object,
  onWordClick: Function,
  onWordHover: Function,
  sanitize: Function,
  searchWords: {
    type: Array, // string[]
    validator(value: string[]) {
      return value.every(word => typeof word === 'string');
    },
    required: true,
  },
  textToHighlight: {
    type: String,
    required: true,
  },
};

// 导出 VueHighlighter 组件。
export const VueHighlighter = VueHighlighterImpl as unknown as {
  new (): {
    $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & VueHighlighterProps;

    $slots: {
      default: (arg: TextChunk[]) => VNode[];
    };
  };
};
