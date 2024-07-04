import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RowData {
  title: string;
  checkboxes: boolean[];
}

@Component({
  selector: 'app-matrix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matrix.component.html',
  styleUrl: './matrix.component.scss'
})
export class MatrixComponent {
  headers = [
    { label: 'Unidades involucradas/ programas-actividades-competencia', color: '#74b72e' },
    { label: 'Área con Vegetación plantada', color: '#ffae6a' },
    { label: 'Facilidades Para Personas con Discapacidades', color: '#ffae6a' },
    { label: 'Facilidades y equipamiento de Seguridad Física y Laboral', color: '#ffae6a' },
    { label: 'Conservación y promoción de la vida silvestre en Campus', color: '#ffae6a' },
    { label: 'Equipamiento para uso Eficiente de la Energía', color: '#ade8f4' },
    { label: 'Edificaciones Inteligentes', color: '#ade8f4' },
    { label: 'Fuentes de Energía Renovables', color: '#ade8f4' },
    { label: 'Consumo de Electricidad', color: '#ade8f4' },
    { label: 'Consumo de Agua', color: '#ade8f4' },
    { label: 'Consumo de Huella de Carbono', color: '#ade8f4' },
    { label: 'Programa Reducción de GEI', color: '#ade8f4' },
    { label: 'Políticas verdes', color: '#ade8f4' },
    { label: 'Programas 3R para Papel y plástico', color: '#bca89f' },
    { label: 'Programas 3R para Materia orgánica', color: '#bca89f' },
    { label: 'Programas 3R para Desechos tóxicos', color: '#bca89f' },
    { label: 'Programas de tratamiento de aguas servidas', color: '#bca89f' },
    { label: 'Programas de conservación y uso Eficiente del Agua', color: '#48cae4' },
    { label: 'Programas Reciclaje del Agua', color: '#48cae4' },
    { label: 'Iniciativas de Transporte de Emisión Cero', color: '#f2a6d7' },
    { label: 'Iniciativas Reducción uso vehículos', color: '#f2a6d7' },
    { label: 'Cursos Académicos con Contenido de Sostenibilidad', color: '#f2a6d7' },
    { label: 'Publicaciones en Sostenibilidad', color: '#f2a6d7' },
    { label: 'Actividades organizadas por estudiantes relacionadas con Sostenibilidad', color: '#f2a6d7' },
    { label: 'Sitio web con contenido de Sostenibilidad', color: '#f2a6d7' },
    { label: 'Reporte de Sostenibilidad', color: '#f2a6d7' },
    { label: 'Actividades culturales en el Campus', color: '#f2a6d7' },
    { label: 'Programas de aprendizaje y enseñanza en Sostenibilidad', color: '#f2a6d7' },
    { label: 'Actividades comunicatorias con contenido de Sostenibilidad', color: '#f2a6d7' },
    { label: 'Iniciativas emprendimientos', color: '#f2a6d7' },
    { label: 'Políticas, lineamientos, estrategias', color: '#c4adeb' },
    { label: 'Inversiones en sostenibilidad', color: '#c4adeb' }
  ];

  rows: RowData[] = [
    { title: 'Vicerrectorado', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Dirección de Finanzas y Administración', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Dirección de Servicios Generales', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Coordinación de Seguridad y Salud Laboral', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Coordinación de Sustentabilidad Ambiental', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Coordinación de Comunicaciones', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Dirección de Extensión Social Universitaria', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'CADH', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Escuela de Ingeniería Civil', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Escuela de Ingeniería Industrial', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Escuela de Ingeniería Informática', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Escuela de Comunicación Social', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Escuela de Administración y Contaduría', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Escuela de Relaciones Industriales', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Escuela de Derecho', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Escuela de Educación', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Coordinación de Cultura', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Coordinación de Internacionalización', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Dirección de Desarrollo Estudiantil', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Coordinación General de Recursos Humanos', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Coordinación General de Tecnología de la Información (CGTI)', checkboxes: Array(this.headers.length).fill(false) },
    { title: 'Centro de Estudios Regionales', checkboxes: Array(this.headers.length).fill(false) }
  ];
}
