import { DefaultLayout } from '@/layouts/default';
import { HosInfoManagePage } from '@/pages/HosInfo/HosInfoManage';
import { WaitAreaManageRouteView } from '@/pages/HosInfo/WaitAreaManage';
import { WaitAreaPage } from '@/pages/HosInfo/WaitAreaManage/pages/WaitArea';
import { WaitAreaTemplatePage } from '@/pages/HosInfo/WaitAreaManage/pages/WaitAreaTemplate';
import { RouteRecordRaw } from 'vue-router';

export const hosInfoRoute: RouteRecordRaw = {
  name: 'HosInfo',
  path: '/hosInfo',
  component: () => Promise.resolve(DefaultLayout),
  meta: { title: '院区信息', icon: 'ph:hospital' },
  children: [
    {
      name: 'HosInfoManage',
      path: 'hosInfoManage',
      component: () => Promise.resolve(HosInfoManagePage),
      meta: { title: '医院信息管理' },
    },
    {
      name: 'WaitAreaManage',
      path: 'waitArea',
      component: () => Promise.resolve(WaitAreaManageRouteView),
      meta: { title: '候诊区管理' },
      children: [
        {
          name: 'WaitArea',
          path: 'waitArea',
          component: () => Promise.resolve(WaitAreaPage),
          meta: { title: '候诊区管理' },
        },
        {
          name: 'WaitAreaTemplate',
          path: 'waitAreaTemplate',
          component: () => Promise.resolve(WaitAreaTemplatePage),
          meta: { title: '候诊规则模板' },
        },
      ],
    },
  ],
};
