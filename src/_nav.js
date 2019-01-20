export default {
  items: [
    {
      title: true,
      name: '중개 관리',
      wrapper: {
        element: '',
        attributes: {},
      },
      class: '',
    },
    {
      name: '중개 대시보드',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: '정산 관리',
    },
    {
      name: '정산 기준 관리',
      url: '/setlBase',
      icon: 'icon-drop',
      children: [
        {
          name: '정산 항목 관리',
          url: '/setlBase/setlItemMgmt',
          icon: 'icon-drop',
        },
        {
          name: '정산 요율 관리',
          url: '/setlBase/setlRatMgmt',
          icon: 'icon-drop',
        },
        {
          name: '정산 대상 관리',
          url: '/setlBase/setlTgtMgmt',
          icon: 'icon-drop',
        },
      ],
    },
    {
      name: '정산 내역 관리',
      url: '/setl',
      icon: 'icon-pencil',
      children: [
        {
          name: '정산 내역 조회',
          url: '/setl/setlInfo',
          icon: 'icon-pencil',
        },
        {
          name: '정산 청구 처리',
          url: '/setl/setlBill',
          icon: 'icon-pencil',
        },
      ],
    },
    {
      name: '정산 통계',
      url: '/setlStat',
      icon: 'icon-puzzle',
      children: [
        {
          name: '정산 내역 통계',
          url: '/setlStat/setlInfoStat',
          icon: 'icon-puzzle',
        },
        {
          name: '정산 청구 통계',
          url: '/setlStat/setlBillStat',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      title: true,
      name: '시스템 관리',
    },
    {
      name: '사용자 관리',
      url: '/onm',
      icon: 'icon-cursor',
      children: [
        {
          name: '사용자/권한 관리',
          url: '/onm/userInfo',
          icon: 'icon-cursor',
        },
        {
          name: '메뉴/권한 관리',
          url: '/onm/menuMgmt',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: '코드 관리',
      url: '/code',
      icon: 'icon-star',
      children: [
        {
          name: '코드 정보 관리',
          url: '/code/codeMgmt',
          icon: 'icon-star',
        },
      ],
    },
  ],
};
