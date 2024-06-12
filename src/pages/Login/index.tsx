import { Transition } from 'vue';
import { NEl } from 'naive-ui';
import { SignIn } from './components';
import loginBg from '@/assets/svgs/loginBg.svg';

export const LoginPage = defineComponent({
  setup() {
    const signType = ref<'signIn'>('signIn');
    const authFormMap = { signIn: <SignIn /> };

    return () => (
      <NEl
        tag='main'
        class='w-full h-full bg-gray-100 dark:bg-[--base-color] flex justify-center items-center overflow-x-hidden'
      >
        <NEl
          class='flex-[2.5] bg-[--body-color] h-[100vh] rounded-l rounded-[3rem] relative <lg:hidden'
          style={{ background: `url("${loginBg}")` }}
        ></NEl>
        <div class='flex-[2.5] flex justify-center'>
          <div class='w-[600px] px-[32px] py-[30px] mt-[-5%] rounded-2xl <lg:(w-[94%] mx-auto)'>
            <div class='w-full'>
              <div class='mb-4 text-3xl font-bold'>欢迎回来</div>
              <div class='mb-12 text-xl'>{import.meta.env.VITE_PROJECT_NAME}</div>
              <div>
                <Transition mode='out-in' appear>
                  {authFormMap[signType.value]}
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </NEl>
    );
  },
});
