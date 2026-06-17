export const grafo = {

  entrada: ['pasillo1'],

  pasillo1: [
    'entrada',
    'pasillo2',
    'Biblioteca',
  ],

  pasillo2: [
    'pasillo1',
    'pasillo3',
    'Baño Mujeres',
    'Baño Hombres',
  ],

  pasillo3: [
    'pasillo2',
    'pasillo4',
    'TNE',
    'Psicologo',
    'DAE',
  ],

  pasillo4: [
    'pasillo3',
    '101',
    '102',
    '103',
    '104',
    '105',
    
  ],

  '101': ['pasillo4'],
  '102': ['pasillo4'],
  '103': ['pasillo4'],
  '104': ['pasillo4'],
  '105': ['pasillo4'],

  Biblioteca: ['pasillo1'],
  DAE: ['pasillo3'],
  Psicologo: ['pasillo3'],
  TNE: ['pasillo3'],
  Enfermeria: ['pasillo2'],

};