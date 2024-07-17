const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/dashboard'
        }
      ]
    },
    {
      id: 'registration',
      title: 'Registration Process',
      type: 'group',
      icon: 'feather icon-edit',
      children: [
        {
          id: 'component',
          title: 'Component',
          type: 'collapse',
          icon: 'feather icon-layers',
          children: [
            {
              id: 'hobbies',
              title: 'Hobby',
              type: 'item',
              icon: 'feather icon-heart',
              url: '/registation/hobby'
            },
            {
              id: 'major',
              title: 'Major',
              type: 'item',
              icon: 'feather icon-briefcase',
              url: '/registation/major'
            },
            {
              id: 'university',
              title: 'University',
              type: 'item',
              icon: 'feather icon-book',
              url: '/registation/university'
            }
          ]
        }
      ]
    },
    {
      id: 'manage',
      title: 'Management',
      type: 'group',
      icon: 'feather icon-settings',
      children: [
        {
          id: 'member',
          title: 'Member',
          type: 'item',
          icon: 'feather icon-user',
          url: '/management/member'
        },
        {
          id: 'package',
          title: 'Package',
          type: 'item',
          icon: 'feather icon-package',
          url: '/management/package'
        }
      ]
    }
  ]
};

export default menuItems;
