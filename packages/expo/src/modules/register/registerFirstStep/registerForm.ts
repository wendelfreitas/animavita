interface IForm {
  name: string;
  label: string;
  placeholder: string;
}

export const registerForm: IForm[] = [
  {
    name: 'name',
    label: 'Nome do Animal',
    placeholder: 'Digite o nome do animal',
  },
  {
    name: 'race',
    label: 'Raça do Animal',
    placeholder: 'Digite a raça do animal',
  },
  {
    name: 'observations',
    label: 'Observações',
    placeholder: 'Observações adicionais sobre o animal',
  },
];
