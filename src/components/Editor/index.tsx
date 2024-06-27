import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IDomEditor, IToolbarConfig, IEditorConfig } from '@wangeditor/editor';
import { PropType } from 'vue';

export const EditorComp = defineComponent({
  props: {
    modelValue: { type: String, required: true },
    height: { type: Number, default: 400 },
    config: { type: Object as PropType<Partial<IEditorConfig>>, default: () => ({ readOnly: false }) },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const editorRef = shallowRef<IDomEditor>();
    const toolbarConfig: Partial<IToolbarConfig> = {};
    const editorConfig = computed<Partial<IEditorConfig>>(() => ({
      placeholder: '请输入...',
      ...props.config,
    }));
    const trueHeight = computed(() => {
      nextTick();
      const toolDom: HTMLElement = document.querySelector('.toolDom')!;
      return props.config.readOnly ? props.height : props.height - (toolDom?.offsetHeight || 100);
    });
    const data = computed({
      get() {
        return props.modelValue;
      },
      set(newValue: any) {
        emit('update:modelValue', newValue);
      },
    });
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (!editor) return;
      editor.destroy();
    });
    const handleCreated = (editor: IDomEditor) => {
      editorRef.value = editor;
    };
    watch(editorRef, () => {
      if (!editorRef.value) return;
      // const toolbar = DomEditor.getToolbar(editorRef.value);
    });
    watch(
      () => props.config.readOnly,
      e => {
        const toolDom: HTMLElement = document.querySelector('.toolDom')!;
        toolDom.style.display = e && toolDom ? 'none' : 'block';
        e && editorRef.value ? editorRef.value?.disable() : editorRef.value?.enable();
      },
      {
        flush: 'post',
        deep: true,
      },
    );
    return () => (
      <div style='border: 1px solid #ccc' class='z-999'>
        <Toolbar
          style='border-bottom: 1px solid #ccc'
          editor={editorRef.value}
          defaultConfig={toolbarConfig}
          mode='default'
          class='toolDom'
        />
        <Editor
          v-model={data.value}
          style={{ overflowY: 'hidden', height: trueHeight.value + 'px' }}
          defaultConfig={editorConfig.value}
          mode='default'
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onOnCreated={handleCreated}
        />
      </div>
    );
  },
});
