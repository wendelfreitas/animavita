import React, {useState} from 'react';
import {View} from 'react-native';
import {Background, Space} from '@animavita/ui/layout';
import {useNavigation} from '@react-navigation/native';
import {Input, Slider, Label, Button} from '@animavita/ui/core';
// import DropDownPicker from 'react-native-dropdown-picker';
import DropDown from '@animavita/ui/core/Form/DropDownPicker';
import {useTheme} from '@animavita/theme';
import {useForm, Controller} from 'react-hook-form';
import Error from '@animavita/ui/core/Form/Error';
import {useI18n} from '@animavita/i18n';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Header from '../Header';

import {registerForm} from './registerForm';
import {ScrollViewContainer, ButtonsView, PortButtonsView, StyledTypography} from './styles';

interface Values {
  gender: string;
  observations: string;
  race: string;
  name: string;
  age: number;
  animalsType: string;
  animalsSize: string;
}

interface Props {
  onSubmit: (values: Values) => void;
}

const Register: React.FC<Props> = () => {
  const theme = useTheme();
  const {t} = useI18n(['register']);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(1);
  const navigation = useNavigation();
  const [animalsType, setAnimalsType] = useState([
    {name: 'animalsType', value: 'dog', label: 'dog', checked: false},
    {name: 'animalsType', value: 'cat', label: 'cat', checked: false},
    {name: 'animalsType', value: 'other', label: 'other', checked: false},
  ]);
  const [animalsSize, setAnimalsSize] = useState([
    {name: 'animalsSize', value: 'small', label: 'small', checked: false},
    {name: 'animalsSize', value: 'medium', label: 'medium', checked: false},
    {name: 'animalsSize', value: 'large', label: 'large', checked: false},
  ]);
  const [genderOpen, setGenderOpen] = useState(false);
  const LARGE = 'large';
  const SMALL = 'small';
  const HEADLINE = 'headline';

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('errors.name')),
    race: Yup.string().required(t('errors.race')),
    observations: Yup.string().required(t('errors.observations')),
    gender: Yup.string().required(t('errors.gender')),
    animalsSize: Yup.string().required(t('errors.animals-size')),
    animalsType: Yup.string().required(t('errors.animals-type')),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function handleSelectedAnimalType(animal: string) {
    const animalsTypeUpdated = [...animalsType];

    animalsTypeUpdated.forEach(animalUpdated => {
      if (animalUpdated.value === animal) {
        animalUpdated.checked = true;
      } else {
        animalUpdated.checked = false;
      }
    });

    setAnimalsType(animalsTypeUpdated);
  }

  function handleSelectedAnimalSize(animal: string) {
    const animalsSizeUpdated = [...animalsSize];

    animalsSizeUpdated.forEach(animalUpdated => {
      if (animalUpdated.value === animal) {
        animalUpdated.checked = true;
      } else {
        animalUpdated.checked = false;
      }
    });

    setAnimalsSize(animalsSizeUpdated);
  }

  function onSubmit() {
    navigation.navigate('RegisterSecondStep');
  }

  return (
    <Background>
      <View style={{flex: 1}}>
        <Header />
        <>
          <ScrollViewContainer>
            {registerForm.map((field, index) => (
              <>
                <Label>{t(`form.${field.name}.label`)}</Label>
                <Controller
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Input
                      key={`input-${index}`}
                      placeholder={t(`form.${field.name}.placeholder`)}
                      onChangeText={value => onChange(value)}
                      value={value}
                      error={errors[field.name]}
                      errorText={errors[field.name]?.message}
                    />
                  )}
                  name={field.name}
                />
                <Space key={`space-${index}`} height={10} />
              </>
            ))}
            <StyledTypography variant={HEADLINE}>{t('animal-type')}</StyledTypography>
            <ButtonsView>
              {animalsType.map((animal, index) => {
                return (
                  <Controller
                    key={index}
                    control={control}
                    render={() => (
                      <Button
                        key={index}
                        text={t(`buttons.animals-type.${animal.label}`)}
                        size={SMALL}
                        active={animal.checked ? true : false}
                        rounded
                        outline
                        onPress={() => {
                          handleSelectedAnimalType(animal.value);
                          setValue(animal.name, animal.value);
                        }}
                      />
                    )}
                    name={animal.name}
                  />
                );
              })}
            </ButtonsView>
            {errors.animalsType && <Error>{errors.animalsType?.message}</Error>}
            <Space height={10} />
            <StyledTypography variant={HEADLINE}>{t('animal-age')}</StyledTypography>
            <Slider
              minimum={1}
              maximum={50}
              value={age}
              suffix={age > 1 ? t('years') : t('year')}
              onValueChange={value => setAge(Math.floor(value))}
            />
            <StyledTypography variant={HEADLINE}>{t('animal-sex')}</StyledTypography>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <DropDown
                  items={[
                    {
                      label: t('male'),
                      value: 'male',
                    },
                    {
                      label: t('female'),
                      value: 'female',
                    },
                  ]}
                  placeholder={t('animal-sex-placeholder')}
                  value={value}
                  onChange={onChange}
                />
              )}
              name="gender"
            />

            {errors.gender && <Error>{errors.gender?.message}</Error>}
            <Space height={10} />
            <StyledTypography variant={HEADLINE}>{t('animal-port')}</StyledTypography>
            <PortButtonsView>
              {animalsSize.map((animal, index) => {
                return (
                  <Controller
                    key={index}
                    control={control}
                    render={() => (
                      <Button
                        key={index}
                        text={t(`buttons.animals-size.${animal.label}`)}
                        size={SMALL}
                        active={animal.checked ? true : false}
                        rounded
                        outline
                        onPress={() => {
                          setValue(animal.name, animal.value);
                          handleSelectedAnimalSize(animal.value);
                        }}
                      />
                    )}
                    name={animal.name}
                  />
                );
              })}
            </PortButtonsView>
            {errors.animalsSize && <Error>{errors.animalsSize?.message}</Error>}
            <Space key={`space`} height={10} />
          </ScrollViewContainer>
          <View>
            {/* <Button
              onPress={handleSubmit(onSubmit)}
              text={t('next-step')}
              size={LARGE}
              gradient={true}
              rounded={true}
              active={false}
            /> */}
            <Button
              onPress={() => {
                const allvalues = getValues();
                // eslint-disable-next-line no-console
                console.log(allvalues);
              }}
              text={t('next-step')}
              size={LARGE}
              gradient={true}
              rounded={true}
              active={false}
            />
          </View>
        </>
      </View>
    </Background>
  );
};

export default Register;
