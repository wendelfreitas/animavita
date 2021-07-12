import {ImageSourcePropType} from 'react-native';

export interface Profile {
  id: number;
  name: string;
  age: number;
  image: ImageSourcePropType;
}
