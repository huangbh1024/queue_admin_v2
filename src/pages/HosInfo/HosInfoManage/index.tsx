import { queryHospHospitalInfo, saveHospHospitalInfo } from '@/apis/hosInfo/hosInfo.api';
import { PageWrapper } from '@/components/PageWrapper';
import { ProForm } from '@/components/ProForm';
import { FormOption, ProFormIns } from '@/components/ProForm/interface';
import { usePublicStore } from '@/stores/modules/public.store';
import { IHosInfo } from '@/types/modules/hosInfo';
import {
  NAlert,
  NButton,
  NCard,
  NImage,
  NInputNumber,
  NSpace,
  NText,
  NUpload,
  UploadProps,
  useMessage,
} from 'naive-ui';
import defaultHosImg from '@/assets/imgs/defaultHosImg.png';
import { EditorComp } from '@/components/Editor';
import { saveSysBusinessLicense } from '@/apis/system/license.api';
import { useUpload } from '@/composables/useUpload';
import { useAuthStore } from '@/stores/modules/auth.store';
export const HosInfoManagePage = defineComponent({
  setup() {
    const formIns = ref<ProFormIns<IHosInfo> | null>(null);
    const hosImgSrc = ref('');
    const hosNote = ref('');
    const { beforeUploadMethod } = useUpload();
    const { uploadBaseURL } = storeToRefs(usePublicStore());
    const { token } = storeToRefs(useAuthStore());
    const queryHosInfo = async () => {
      const { data } = await queryHospHospitalInfo();
      formIns.value?.setFormData(data);
      hosImgSrc.value = data.hospitalLogoPic;
      hosNote.value = data.hospitalNote;
    };
    queryHosInfo();
    const { dictAll } = storeToRefs(usePublicStore());
    const formOptions: FormOption<IHosInfo>[] = [
      {
        label: '医院名称',
        span: 12,
        path: 'hospitalName',
        type: 'input',
        props: { placeholder: '请输入医院名称' },
        rule: { message: '请输入医院名称', required: true, trigger: 'blur' },
      },
      {
        label: '组织代码',
        path: 'orgCode',
        span: 12,
        type: 'input',
        props: { placeholder: '请输入组织代码' },
        rule: { message: '请输入组织代码', required: true, trigger: 'blur' },
      },
      {
        label: '产品代码',
        path: 'projectCode',
        span: 12,
        type: 'input',
        props: { placeholder: '请输入产品代码' },
        rule: { message: '请输入产品代码', required: true, trigger: 'blur' },
      },
      {
        label: '医院等级',
        path: 'hospitalLevel',
        span: 12,
        type: 'select',
        props: {
          placeholder: '请选择医院等级',
          options: dictAll.value['hosp_level'] as any,
          labelField: 'dictValue',
          valueField: 'dictCode',
        },
        rule: { message: '请选择医院等级', required: true, trigger: 'change' },
      },
      { label: '地址', path: 'hospitalAddress', span: 24, type: 'input', props: { placeholder: '请输入地址' } },
      { label: '电话', path: 'hospitalTelephone', span: 12, type: 'input', props: { placeholder: '请输入电话' } },
      {
        label: '床位',
        span: 12,
        render: rowData => (
          <NInputNumber class='w-full' v-model:value={rowData.bedNum} placeholder='请输入床位' min={0}>
            {{ suffix: () => <NText>张</NText> }}
          </NInputNumber>
        ),
      },
      {
        label: '序列号',
        span: 12,
        render: rowData => (
          <NAlert type='info' class='w-full'>
            {rowData.dmidecodeUUID ? rowData.dmidecodeUUID : '暂未查询到序列号'}
          </NAlert>
        ),
      },
      {
        label: '有效期',
        span: 12,
        render: rowData => (
          <NAlert type='info' class='w-full'>
            {rowData.hospitalExpiryDate ? rowData.hospitalExpiryDate : '暂未查询到有效期'}
          </NAlert>
        ),
      },
      {
        label: '注册码',
        span: 24,
        path: 'license',
        type: 'input',
        props: { placeholder: '请输入注册码', type: 'textarea' },
      },
      {
        label: '设备注册码',
        span: 24,
        path: 'deviceNumLicense',
        type: 'input',
        props: { placeholder: '请输入设备注册码', type: 'textarea' },
      },
      {
        label: '功能注册码',
        span: 24,
        path: 'moduleLicense',
        type: 'input',
        props: { placeholder: '请输入功能注册码', type: 'textarea' },
      },
    ];
    const message = useMessage();
    const onSave = () => {
      formIns.value?.validate(async error => {
        if (error) return;
        const formData = formIns.value?.getFormData() ?? { deviceNumLicense: '', moduleLicense: '' };
        await Promise.all([
          saveHospHospitalInfo({ ...formData, hospitalLogoPic: hosImgSrc.value, hospitalNote: hosNote.value }),
          saveSysBusinessLicense({
            deviceLicense: formData.deviceNumLicense,
            moduleLicense: formData.moduleLicense,
          }),
        ]);
        message.success('保存成功');
        window.location.reload();
      });
    };
    const onFinish: UploadProps['onFinish'] = ({ event }) => {
      let response = (event?.target as XMLHttpRequest).response;
      typeof response === 'string' ? (response = JSON.parse(response)) : '';
      const { data } = response;
      hosImgSrc.value = data.fileSrc;
    };
    return () => (
      <PageWrapper>
        <NCard
          title='医院信息'
          headerExtra={() => (
            <NButton type='primary' onClick={onSave}>
              保存
            </NButton>
          )}
        >
          <NSpace justify='space-around'>
            <NSpace vertical align='center' justify='center'>
              <NImage
                src={hosImgSrc.value ? uploadBaseURL.value + hosImgSrc.value : defaultHosImg}
                fallbackSrc={defaultHosImg}
                width={120}
                height={120}
                objectFit='contain'
              />
              <NUpload
                action={uploadBaseURL.value + 'system/sysFile/uploadFile'}
                showFileList={false}
                data={{ fileType: 'hospital', uploadType: '1' }}
                headers={{ token: token.value }}
                name='uploadFile'
                accept='.jpg, .png, .jpeg'
                onBeforeUpload={beforeUploadMethod(['image/jpeg', 'image/png', 'image/jpg'], 10 * 1024 * 1024)}
                onFinish={onFinish}
              >
                <NButton type='primary'>上传医院图片</NButton>
              </NUpload>
              <NText>只能上传jpg/png文件，且不超过10MB</NText>
            </NSpace>
            <ProForm formOptions={formOptions} ref={formIns} />
          </NSpace>
          <EditorComp modelValue={hosNote.value} onUpdate:modelValue={(val: string) => (hosNote.value = val)} />
        </NCard>
      </PageWrapper>
    );
  },
});
