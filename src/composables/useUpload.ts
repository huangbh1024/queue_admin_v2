import { UploadProps, useMessage } from 'naive-ui';

export const useUpload = () => {
  const message = useMessage();
  const beforeUploadMethod = (accepts?: string[], size?: number): UploadProps['onBeforeUpload'] => {
    return ({ file: { file } }) => {
      if (!file) {
        message.error('未知文件');
        return;
      }
      if (accepts) {
        if (!file.type) {
          message.warning('未知文件格式');
          return;
        }
        if (!accepts.includes(file.type)) {
          message.error('文件格式有误');
          return;
        }
      }
      if (size && size < file.size) {
        message.error('上传文件大小有误');
        return;
      }
    };
  };
  return { beforeUploadMethod };
};
