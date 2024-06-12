import { Transition, defineComponent } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';
import { TransitionConstant } from '@/constants/transition.constant';

export const LayoutContent = defineComponent({
  setup() {
    return () => (
      <RouterView>
        {({ Component: RouteComponent, route }: { Component: any; route: RouteLocationNormalizedLoaded }) => (
          <Transition appear mode='out-in' name={TransitionConstant.FADE}>
            <RouteComponent key={route.path} />
          </Transition>
        )}
      </RouterView>
    );
  },
});
