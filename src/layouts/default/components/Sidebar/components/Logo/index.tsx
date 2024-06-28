import { Transition } from 'vue';
import { TransitionConstant } from '@/constants/transition.constant';
import Logo from '@/assets/imgs/logo.png';

export interface SidebarLogoProps {
  displayTitle?: boolean;
  titleSize?: string;
  isMini?: boolean;
  isDarkMode?: boolean;
}

export const SidebarLogo = defineComponent({
  props: {
    displayTitle: { type: Boolean, default: false },
    titleSize: { type: String, default: 'xl' },
    isMini: { type: Boolean, default: true },
    isDarkMode: { type: Boolean },
  },
  setup(props) {
    // 获取应用名称
    const applicationName = computed(() => import.meta.env.VITE_PROJECT_NAME);
    return () => (
      <div class={[`text-${props.titleSize}`, 'flex', 'items-center', 'h-full']}>
        <Transition name={TransitionConstant.FADE} mode='in-out'>
          {props.isMini ? <img class='block h-full max-h-8 m-3' alt='App Logo' src={Logo} /> : null}
        </Transition>
        {props.displayTitle ? <span class='font-semibold'>{applicationName.value}</span> : null}
      </div>
    );
  },
});
