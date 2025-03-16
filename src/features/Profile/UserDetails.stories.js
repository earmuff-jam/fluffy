import UserDetails from './UserDetails';

export default {
  title: 'Profile/UserDetails',
  component: UserDetails,
  tags: ['autodocs'],
};

const Template = (args) => <UserDetails {...args} />;

export const UserDetailsDefault = Template.bind({});
export const UserDetailsLongAboutMe = Template.bind({});

UserDetailsDefault.args = {
  aboutMe: '',
  updatedAt: '2024-11-24T01:24:30.874189Z',
};

UserDetailsLongAboutMe.args = {
  aboutMe:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
  updatedAt: '2024-11-24T01:24:30.874189Z',
};
