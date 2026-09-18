// Configuração do site num lugar só.
//
// WhatsApp de atendimento: 55 + DDD + número, só dígitos.
export const WHATSAPP = "5541988693911";

// Cursos: cada card da Loja leva à sua própria página de venda.
// Os demais produtos continuam no WhatsApp até existir checkout físico.
export const DESTINOS_LOJA: Record<string, string> = {
  "course-master": "/masterclass-hieroglifos/",
  "course-astronomy": "/masterclass-arqueoastronomia/",
  // O combo não tem página de venda própria: o cartão da Loja já
  // descreve a oferta inteira, então ele vai direto ao checkout.
  "course-combo": "https://pay.cakto.com.br/mryzbp7_1113067",
};

// O documentário. Cole aqui só o ID do vídeo no YouTube — o pedaço depois
// de "v=" no endereço. Enquanto estiver vazio, a seção do filme não aparece
// no site e nada muda.
//
//   https://www.youtube.com/watch?v=dQw4w9WgXcQ   ->   "dQw4w9WgXcQ"
export const VIDEO_DOCUMENTARIO = "";

// O trailer. Mesma regra: só o ID do YouTube. Vazio, o botão "Assistir ao
// trailer" continua rolando até a seção do documentário, como hoje.
export const VIDEO_TRAILER = "";
