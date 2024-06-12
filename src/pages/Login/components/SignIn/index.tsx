import { NForm, type FormRules, type FormInst, NFormItem, NInput, NCheckbox, NButton } from 'naive-ui';

export const SignIn = defineComponent({
  setup() {
    const rules = reactive<FormRules>({
      account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    });
    const model = reactive(JSON.parse(localStorage.getItem('SIGN_IN_INFO') ?? '{"account":"","password":""}'));
    const formRef = ref<FormInst | null>(null);
    const onSubmit = () => {
      formRef.value?.validate(error => {
        if (error?.length) return;
        cacheSignInInfo();
      });
    };

    // 缓存账号密码
    const isRemember = ref<boolean>(localStorage.getItem('IS_REMEMBER') === 'true');
    const cacheSignInInfo = () => {
      if (isRemember.value) localStorage.setItem('SIGN_IN_INFO', JSON.stringify(model));
      else localStorage.removeItem('SIGN_IN_INFO');
      localStorage.setItem('IS_REMEMBER', isRemember.value.toString());
    };
    return () => (
      <NForm ref={formRef} model={model} rules={rules}>
        <NFormItem label='账号' path='account'>
          <NInput size='large' placeholder='请输入账号' v-model:value={model.account} />
        </NFormItem>
        <NFormItem label='密码' path='password'>
          <NInput
            size='large'
            placeholder='请输入密码'
            type='password'
            show-password-on='click'
            v-model:value={model.password}
          />
        </NFormItem>
        <div class='flex flex-col items-end gap-6'>
          <div class='flex justify-between w-full'>
            <NCheckbox size='large' v-model:checked={isRemember.value}>
              记住我
            </NCheckbox>
          </div>
          <div class='w-full'>
            <NButton type='primary' class='w-full' size='large' onClick={onSubmit}>
              登录
            </NButton>
          </div>
        </div>
      </NForm>
    );
  },
});
