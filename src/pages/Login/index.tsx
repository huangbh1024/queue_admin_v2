import { NButton } from 'naive-ui';
import { defineComponent } from 'vue';

export const LoginPage = defineComponent({
  setup() {
    return () => (
      <div class='border border-red border-solid w-200px h-200px'>
        <NButton>test</NButton>
      </div>
    );
  },
});
