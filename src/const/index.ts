// Types
import { OptionType } from 'types/index';

// Assets
import MC from 'src/assets/images/partidos/MC.svg';
import MORENA from 'src/assets/images/partidos/MORENA.svg';
import PAN from 'src/assets/images/partidos/PAN.svg';
import PANAL from 'src/assets/images/partidos/PANAL.svg';
import PES from 'src/assets/images/partidos/PES.svg';
import PRD from 'src/assets/images/partidos/PRD.svg';
import PRI from 'src/assets/images/partidos/PRI.svg';
import PT from 'src/assets/images/partidos/PT.svg';
import PVEM from 'src/assets/images/partidos/PVEM.svg';
import SP from 'src/assets/images/partidos/SP.svg';

export const ENTIDADES: OptionType[] = [
  {
    id: '01',
    name: 'Aguascalientes'
  },
  {
    id: '02',
    name: 'Baja California'
  },
  {
    id: '03',
    name: 'Baja California Sur'
  },
  {
    id: '04',
    name: 'Campeche'
  },
  {
    id: '07',
    name: 'Chiapas'
  },
  {
    id: '08',
    name: 'Chihuahua'
  },
  {
    id: '09',
    name: 'Ciudad de México'
  },
  {
    id: '05',
    name: 'Coahuila'
  },
  {
    id: '06',
    name: 'Colima'
  },
  {
    id: '10',
    name: 'Durango'
  },
  {
    id: '11',
    name: 'Guanajuato'
  },
  {
    id: '12',
    name: 'Guerrero'
  },
  {
    id: '13',
    name: 'Hidalgo'
  },
  {
    id: '14',
    name: 'Jalisco'
  },
  {
    id: '15',
    name: 'Estado de México'
  },
  {
    id: '16',
    name: 'Michoacán'
  },
  {
    id: '17',
    name: 'Morelos'
  },
  {
    id: '18',
    name: 'Nayarit'
  },
  {
    id: '19',
    name: 'Nuevo León'
  },
  {
    id: '20',
    name: 'Oaxaca'
  },
  {
    id: '21',
    name: 'Puebla'
  },
  {
    id: '22',
    name: 'Querétaro'
  },
  {
    id: '23',
    name: 'Quintana Roo'
  },
  {
    id: '24',
    name: 'San Luis Potosí'
  },
  {
    id: '25',
    name: 'Sinaloa'
  },
  {
    id: '26',
    name: 'Sonora'
  },
  {
    id: '27',
    name: 'Tabasco'
  },
  {
    id: '28',
    name: 'Tamaulipas'
  },
  {
    id: '29',
    name: 'Tlaxcala'
  },
  {
    id: '30',
    name: 'Veracruz'
  },
  {
    id: '31',
    name: 'Yucatán'
  },
  {
    id: '32',
    name: 'Zacatecas' }
];

export const PARTIDOS = [
  {
    name: 'MC',
    longName: 'Movimiento Ciudadano',
    photo: MC,
    id: 1
  },
  {
    name: 'MORENA',
    longName: 'Movimiento Regeneración Nacional',
    photo: MORENA,
    id: 2
  },
  {
    name: 'PAN',
    longName: 'Partido Acción Nacional',
    photo: PAN,
    id: 3
  },
  {
    name: 'PANAL',
    longName: 'Partido Nueva Alianza',
    photo: PANAL,
    id: 4
  },
  {
    name: 'PES',
    longName: 'Partido Encuentro Social',
    photo: PES,
    id: 5
  },
  {
    name: 'PRD',
    longName: 'Partido de la Revolución Democrática',
    photo: PRD,
    id: 6
  },
  {
    name: 'PRI',
    longName: 'Partido Revolucionario Institucional',
    photo: PRI,
    id: 7
  },
  {
    name: 'PT',
    longName: 'Partido del Trabajo',
    photo: PT,
    id: 8
  },
  {
    name: 'PVEM',
    longName: 'Partido Verde Ecologista de México',
    photo: PVEM,
    id: 9
  },
  {
    name: 'SP',
    longName: 'Sin partido',
    photo: SP,
    id: 10
  },

];

export const getEmojiByAnswer = (answer: string): string => {
  if (answer === 'A FAVOR') {
    return '✅';
  } else if (answer === 'EN CONTRA') {
    return '❌';
  } else if (answer === 'ABSTENCIÓN') {
    return '👻';
  } else if (answer === 'INDECISIÓN') {
    return '🤔';
  }

  return '';
};