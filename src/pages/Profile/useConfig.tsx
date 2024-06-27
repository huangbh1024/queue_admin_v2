import { updateSysUser, updateSysUserPwd } from '@/apis/system/user.api';
import { FormOption } from '@/components/ProForm/interface';
import { useAuthStore } from '@/stores/modules/auth.store';
import { usePublicStore } from '@/stores/modules/public.store';
import { UserInfo } from '@/types';
import {
  NSpace,
  NAvatar,
  NUpload,
  NButton,
  NText,
  NInput,
  NButtonGroup,
  useMessage,
  UploadProps,
  UploadInst,
} from 'naive-ui';
import { Md5 } from 'ts-md5';
import defaultHead from '@/assets/imgs/defaultHead.png';
import { useUpload } from '@/composables/useUpload';
import { useFormDrawer } from '@/composables/useFormDrawer';

export const useConfig = () => {
  const { formIns, visible, onEdit, title, onClose } = useFormDrawer<UserInfo>();
  const { userInfo, token } = storeToRefs(useAuthStore());
  const { dictAll, roleList, uploadBaseURL } = storeToRefs(usePublicStore());
  const passwords = reactive({ oldPassword: '', newPassword: '' });
  const message = useMessage();
  const onClickModifyPassword = async () => {
    if (passwords.newPassword.length < 6) return message.error('密码必须大于或等于6位!');
    await updateSysUserPwd({
      userName: userInfo.value?.userName ?? '',
      newUserPassword: Md5.hashStr(passwords.newPassword),
      oldUserPassword: Md5.hashStr(passwords.oldPassword),
    });
    message.success('更改密码成功');
  };
  const { beforeUploadMethod } = useUpload();
  const onFinish: UploadProps['onFinish'] = ({ event }) => {
    message.success('上传成功');
    let response = (event?.target as XMLHttpRequest).response;
    typeof response === 'string' ? (response = JSON.parse(response)) : '';
    const { data } = response;
    const formData = formIns.value?.getFormData() ?? {};
    formIns.value?.setFormData({ ...formData, userPic: data.fileSrc });
  };
  const uploadRef = ref<UploadInst | null>(null);
  const formOptions: FormOption<UserInfo>[] = [
    {
      label: '头像',
      path: 'userPic',
      render: rowData => (
        <NSpace vertical align='center' justify='center'>
          <NAvatar
            class='w-120px h-120px'
            round
            src={rowData.userPic ? uploadBaseURL.value + rowData.userPic : defaultHead}
            fallbackSrc={defaultHead}
          ></NAvatar>
          <NUpload
            ref={uploadRef}
            action={uploadBaseURL.value + 'system/sysFile/uploadFile'}
            name='uploadFile'
            data={{ fileType: 'workerPic', uploadType: '1' }}
            headers={{ token: token.value }}
            accept='.jpg, .png, .jpeg'
            onBeforeUpload={beforeUploadMethod(['image/jpeg', 'image/png', 'image/jpg'], 10 * 1024 * 1024)}
            onFinish={onFinish}
            showFileList={false}
          >
            <NButton type='primary'>上传头像</NButton>
          </NUpload>
          <NText>只能上传jpg/png文件，且不超过10MB</NText>
        </NSpace>
      ),
      span: 12,
      showLabel: false,
      offset: 6,
    },
    {
      label: '职工姓名',
      type: 'input',
      path: 'userRealname',
      span: 12,
      rule: { required: true, message: '请输入职工姓名', trigger: 'blur' },
    },
    {
      label: '职工账号',
      type: 'input',
      path: 'userName',
      span: 12,
      props: { disabled: true },
      rule: { required: true, message: '请输入职工账号', trigger: 'blur' },
    },
    {
      label: '职工旧密码',
      span: 12,
      render: () => (
        <NInput placeholder='请输入职工旧密码' clearable type='password' v-model:value={passwords.oldPassword} />
      ),
    },
    {
      label: '职工新密码',
      span: 12,
      render: () => (
        <NButtonGroup>
          <NInput
            placeholder='请输入职工新密码'
            clearable
            type='password'
            v-model:value={passwords.newPassword}
            disabled={!passwords.oldPassword.length}
          />
          <NButton
            ghost
            disabled={!passwords.oldPassword.length || !passwords.newPassword.length}
            onClick={onClickModifyPassword}
          >
            修改密码
          </NButton>
        </NButtonGroup>
      ),
    },
    { label: 'his职工工号', path: 'userOutNo', span: 24, type: 'input', props: { placeholder: '请输入his职工工号' } },
    {
      label: '职工职称',
      path: 'userProfessional',
      span: 12,
      type: 'select',
      props: {
        placeholder: '请选择职工职称',
        options: dictAll.value['hosp_professional'] as any,
        labelField: 'dictValue',
        valueField: 'dictValue',
        clearable: true,
      },
    },
    {
      label: '职工职务',
      path: 'userDuty',
      span: 12,
      type: 'select',
      props: {
        placeholder: '请选择职工职务',
        options: dictAll.value['hosp_duty'] as any,
        valueField: 'dictValue',
        labelField: 'dictValue',
        clearable: true,
      },
    },
    {
      label: '用户类型',
      path: 'userType',
      span: 12,
      type: 'select',
      props: {
        placeholder: '请选择用户类型',
        options: dictAll.value['sys_user_type'] as any,
        valueField: 'dictCode',
        labelField: 'dictValue',
      },
    },
    {
      label: '人员角色',
      path: 'roleIdList',
      span: 12,
      type: 'select',
      props: {
        placeholder: '请选择人员角色',
        multiple: true,
        options: roleList.value as any,
        valueField: 'id',
        labelField: 'roleName',
        maxTagCount: 2,
      },
    },
    { label: '专长', path: 'userSpeciality', span: 12, type: 'input', props: { placeholder: '请输入职工专长' } },
    {
      label: '性别',
      path: 'userSex',
      span: 12,
      type: 'select',
      props: {
        placeholder: '请选择性别',
        options: dictAll.value['sex_dict'] as any,
        labelField: 'dictValue',
        valueField: 'dictCode',
      },
    },
    { label: '简介', path: 'remark', span: 24, type: 'input', props: { placeholder: '请输入简介', type: 'textarea' } },
    {
      label: '是否启用',
      path: 'isEnable',
      span: 12,
      type: 'switch',
      props: { checkedValue: '1', uncheckedValue: '0' },
    },
  ];
  watch(visible, val => {
    if (!val) {
      formIns.value?.restoreValidation();
      passwords.newPassword = '';
      passwords.oldPassword = '';
    }
  });
  const onSave = () => {
    formIns.value?.validate(async error => {
      if (error) return;
      const formData = formIns.value?.getFormData() ?? {};
      delete formData.userPassword;
      await updateSysUser(formData);
      message.success('更改成功');
      userInfo.value = formData as UserInfo;
      uploadRef.value?.clear();
      onClose();
    });
  };
  return { formOptions, visible, onEdit, title, onClose, formIns, onSave };
};
