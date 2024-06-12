import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui';
import { RouterView } from 'vue-router';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    borderRadius: '0.5rem',
    borderRadiusSmall: '0.25rem',
    cubicBezierEaseInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    cubicBezierEaseOut: 'cubic-bezier(0.33, 1, 0.68, 1)',
    cubicBezierEaseIn: 'cubic-bezier(0.32, 0, 0.67, 0)',
  },
  Card: { borderRadius: '1rem' },
};

export const App = defineComponent({
  setup() {
    return () => (
      <NConfigProvider themeOverrides={themeOverrides} class='w-full h-full' inlineThemeDisabled>
        <RouterView />
      </NConfigProvider>
    );
  },
});
