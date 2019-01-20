import React from 'react';
import LayoutContainer from 'containers/comn/layout';

// 중개
const Dashboard = React.lazy(() => import('views/medi/dashboard/Dashboard'));

// 정산
// const SetlItem = React.lazy(() => import('views/setl/setlItem/SetlItem'));
// const SetlTxn = React.lazy(() =>
//   import('containers/setl/setlTxn/SetlTxnContainer'),
// );

// 시스템
// const UserInfo = React.lazy(() => import('views/onm/userInfo/UserInfo'));
// const MenuInfo = React.lazy(() => import('views/onm/menuInfo/MenuInfo'));

// 예제
const Alert = React.lazy(() => import('views/example/alert/ReactAlertExample'));
const Post = React.lazy(() => import('containers/example/crud/PostContainer'));
const DataGrid = React.lazy(() =>
  import('views/example/datagrid/SimpleGridExample'),
);
const DatePicker = React.lazy(() =>
  import('views/example/datepicker/DatePickerExample'),
);
const List = React.lazy(() =>
  import('views/example/list/ReactVirtualizedListExample'),
);
const Modal = React.lazy(() => import('views/example/modal/ModalExample'));
const Table = React.lazy(() => import('views/example/table/TableExample'));
const Tree = React.lazy(() => import('views/example/tree/TreeExample'));

const routes = [
  // 메인
  { path: '/main', exact: true, name: 'Main', component: LayoutContainer },
  // 중개
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // 정산
  // {
  //   path: '/setlBase/setlItem',
  //   exact: true,
  //   name: '정산항목',
  //   component: SetlItem,
  // },
  // {
  //   path: '/setl/setlTxn',
  //   exact: true,
  //   name: '정산내역',
  //   component: SetlTxn,
  // },
  // 시스템
  // {
  //   path: '/onm/userInfo',
  //   exact: true,
  //   name: '사용자정보',
  //   component: UserInfo,
  // },
  // {
  //   path: '/onm/menuInfo',
  //   exact: true,
  //   name: '메뉴정보',
  //   component: MenuInfo,
  // },
  // 예제
  {
    path: '/example/alert',
    exact: true,
    name: 'Alert',
    component: Alert,
  },
  {
    path: '/example/crud',
    exact: true,
    name: 'Crud',
    component: Post,
  },
  {
    path: '/example/datagrid',
    exact: true,
    name: 'DataGrid',
    component: DataGrid,
  },
  {
    path: '/example/datepicker',
    exact: true,
    name: 'DatePicker',
    component: DatePicker,
  },
  {
    path: '/example/list',
    exact: true,
    name: 'List',
    component: List,
  },
  {
    path: '/example/modal',
    exact: true,
    name: 'Modal',
    component: Modal,
  },
  {
    path: '/example/table',
    exact: true,
    name: 'Table',
    component: Table,
  },
  {
    path: '/example/tree',
    exact: true,
    name: 'Tree',
    component: Tree,
  },
];

export default routes;
