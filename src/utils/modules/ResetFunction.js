import * as NavigationService from './NavigationService';

const ResetFunction = {
  //fix crash when navigatio is not ready
  resetToHome: navigation => {
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'SlideDraw',
            params: {
              name: 'Main',
              params: {
                screen: 'Home',
              },
            },
          },
        ],
      });
      return;
    }

    NavigationService.reset({
      index: 0,
      routes: [
        {
          name: 'SlideDraw',
          params: {
            name: 'Main',
            params: {
              screen: 'Home',
            },
          },
        },
      ],
    });
  },
  // 
  resetToChooseClass: navigation => {
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'ChooseClass',
            params: {
              name: 'ChooseClass',
              params: {
                screen: 'ChooseClass',
              },
            },
          },
        ],
      });
      return;
    }

    NavigationService.reset({
      index: 0,
      routes: [
        {
          name: 'ChooseClass',
          params: {
            name: 'ChooseClass',
            params: {
              screen: 'ChooseClass',
            },
          },
        },
      ],
    });
  },
  resetToDsHocSinh: navigation => {
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'DsHocSinh',
            params: {
              name: 'DsHocSinh',
              params: {
                screen: 'DsHocSinh',
              },
            },
          },
        ],
      });
      return;
    }

    NavigationService.reset({
      index: 0,
      routes: [
        {
          name: 'DsHocSinh',
          params: {
            name: 'DsHocSinh',
            params: {
              screen: 'DsHocSinh',
            },
          },
        },
      ],
    });
  },
  resetToOff: navigation => {
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'XinNghi',
          },
        ],
      });
      return;
    }
    NavigationService.reset({
      index: 0,
      routes: [
        {
          name: 'XinNghi',
        },
      ],
    });
  },
  resetToAdvice: navigation => {
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'LoiNhan',
          },
        ],
      });
      return;
    }
    NavigationService.reset({
      index: 0,
      routes: [
        {
          name: 'LoiNhan',
        },
      ],
    });
  },
  resetToLogin: navigation => {
    // AccountService.set();

    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
          },
        ],
      });
      return;
    }
    NavigationService.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    });
  },
};

export {ResetFunction};
