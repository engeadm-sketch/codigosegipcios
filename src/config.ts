// Configuração do site num lugar só.
//
// WhatsApp de atendimento: 55 + DDD + número, só dígitos.
export const WHATSAPP = "5541988693911";

// Cursos: cada card da Loja leva à sua própria página de venda.
// Os demais produtos continuam no WhatsApp até existir checkout físico.
export const DESTINOS_LOJA: Record<string, string> = {
  "course-master": "/masterclass-hieroglifos/",
  "course-astronomy": "/masterclass-arqueoastronomia/",
};
