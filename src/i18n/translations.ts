export type Language = "pt" | "en" | "es";

export interface SiteData {
  name: string;
  location: string;
  dynasty: string;
  age: string;
  keyDiscovery: string;
  desc: string;
  anomalies: string[];
  data: { label: string; value: string }[];
}

export interface SymbolAttr {
  symbolPart: string;
  meaning: string;
  ratio: string;
}

export interface SymbolData {
  name: string;
  meaning: string;
  insight: string;
  quote: string;
  attrs: SymbolAttr[];
}

export interface StudyPoint {
  label: string;
  metric: string;
}

export interface StudyData {
  title: string;
  subtitle: string;
  principle: string;
  evidence: string;
  desc: string;
  points: StudyPoint[];
}

export interface TranslationSchema {
  nav: {
    solutions: string;
    documentary: string;
    resources: string;
    about: string;
    store: string;
    login: string;
    getStarted: string;
  };
  hero: {
    kicker: string;
    headline1: string;
    headline2: string;
    subtitle: string;
    exploreBtn: string;
    trailerBtn: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
  };
  carousel: {
    tag: string;
    title: string;
  };
  bento: {
    card1Title: string;
    card1Tag: string;
    card1Desc: string;
    card2Tag: string;
    card2Title: string;
    card3Title: string;
    card3Sub: string;
    card4Number: string;
    card4Label: string;
    card5Title: string;
    card5Desc: string;
    card5Badge1: string;
    card5Badge2: string;
    card6Btn: string;
    card6ActiveCount: string;
    card6ActiveLabel: string;
    cartographyTitle: string;
    cartographyDesc: string;
    epigraphicTitle: string;
    epigraphicDesc: string;
  };
  storeSection: {
    tag: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterCourses: string;
    filterApparel: string;
    filterAccessories: string;
    buyBtn: string;
    badgeNew: string;
    items: {
      id: string;
      title: string;
      category: string;
      price: string;
      desc: string;
      tag: string;
      rating: string;
    }[];
  };
  math: {
    tag: string;
    title: string;
    subtitle: string;
    source: string;
    canonicalEq: string;
    evidenceTitle: string;
    tolerance: string;
    sacredMath: string;
    topics: {
      rhind: {
        title: string;
        subtitle: string;
        badge: string;
        desc: string;
        details: string[];
        source: string;
      };
      cubit: {
        title: string;
        subtitle: string;
        badge: string;
        desc: string;
        details: string[];
        source: string;
      };
      acoustic: {
        title: string;
        subtitle: string;
        badge: string;
        desc: string;
        details: string[];
        source: string;
      };
    };
  };
  necropolis: {
    tag: string;
    title: string;
    subtitle: string;
    anomaliesTitle: string;
    excavationRecord: string;
    academicDoc: string;
    keyDiscoveryTag: string;
    georefCoords: string;
    satellite: string;
    sites: {
      giza: SiteData;
      saqqara: SiteData;
      kings_valley: SiteData;
      abydos: SiteData;
    };
  };
  lexicon: {
    tag: string;
    title: string;
    subtitle: string;
    decompositionTitle: string;
    symbols: {
      wedjat: SymbolData;
      ankh: SymbolData;
      djed: SymbolData;
      khepri: SymbolData;
    };
  };
  eng: {
    tag: string;
    title: string;
    subtitle: string;
    tagStudy: string;
    primaryEvidence: string;
    paramsTitle: string;
    empiricValidation: string;
    studies: {
      sand_friction: StudyData;
      merer_papyrus: StudyData;
      tubular_drills: StudyData;
      internal_ramp: StudyData;
    };
  };
  footer: {
    quotePetrie: string;
    authorPetrie: string;
    subPetrie: string;
    quoteChampollion: string;
    authorChampollion: string;
    subChampollion: string;
    timelineTitle: string;
    brandDesc: string;
    dossiersTitle: string;
    museumsTitle: string;
    copyright: string;
    preservation: string;
    whatsappTooltip: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  pt: {
    nav: {
      solutions: "Soluções",
      documentary: "Documentário",
      resources: "Recursos",
      about: "Sobre",
      store: "Loja",
      login: "Entrar",
      getStarted: "Comece agora",
    },
    hero: {
      kicker: "Desvendando os",
      headline1: "Códigos",
      headline2: "Egípcios",
      subtitle: "Uma jornada pelos mistérios, símbolos e conhecimentos que atravessaram milênios.",
      exploreBtn: "Explorar o documentário",
      trailerBtn: "Assistir ao trailer",
      feature1: "História Real",
      feature2: "Símbolos Antigos",
      feature3: "Conhecimento Secreto",
      feature4: "Um Legado Para o Mundo",
    },
    carousel: {
      tag: "Reconhecimento & Pesquisa de Estudiosos",
      title: "Inspirado Pelas Maiores Instituições do Mundo",
    },
    bento: {
      card1Title: "Decodificação Instantânea de Hieróglifos",
      card1Tag: "ACESSO IMEDIATO",
      card1Desc: "Arquivo 4K HDR • Escaneamento 3D",
      card2Tag: "CÓDIGO EGÍPCIO • IA CÓSMICA",
      card2Title: "O PORTAL CÓSMICO DA ANTIGA SABEDORIA",
      card3Title: "Visão Espectral",
      card3Sub: "Lidar 3D Ativo",
      card4Number: "25M",
      card4Label: "inscrições catalogadas",
      card5Title: "Arquivos Sagrados",
      card5Desc: "Papiros reais e modelos 3D prontos para análise fotogramétrica.",
      card5Badge1: "100% Inédito",
      card5Badge2: "• Transliterar",
      card6Btn: "+ EXPLORAR ARQUIVO",
      card6ActiveCount: "12K",
      card6ActiveLabel: "PESQUISADORES ATIVOS",
      cartographyTitle: "Cartografia Estelar",
      cartographyDesc: "Mapeamento 3D da correlação milenar entre os monumentos de Gizé e o cinturão de Órion.",
      epigraphicTitle: "Motor Epigráfico",
      epigraphicDesc: "Transliteração neural instantânea de hieróglifos selados em câmaras subterrâneas.",
    },
    storeSection: {
      tag: "Coleção Oficial & Cursos",
      title: "Loja de Artefatos & Treinamentos",
      subtitle: "Vista a sabedoria milenar do Nilo e domine os segredos da egiptologia e arqueoastronomia com nossos cursos exclusivos e produtos premium.",
      filterAll: "Todos os Itens",
      filterCourses: "Cursos & Masterclasses",
      filterApparel: "Vestuário Premium",
      filterAccessories: "Acessórios & Canecas",
      buyBtn: "Garantir Agora",
      badgeNew: "Exclusivo",
      items: [
        {
          id: "course-master",
          title: "Masterclass: Epigrafia & Leitura de Hieróglifos",
          category: "courses",
          price: "R$ 197",
          desc: "Curso completo do básico ao avançado com certificado digital de conclusão e material didático.",
          tag: "Curso Online • 40h",
          rating: "4.9 ★★★★★",
        },
        {
          id: "hoodie-eye",
          title: "Moletom Oversized Olho de Hórus (Wedjat)",
          category: "apparel",
          price: "R$ 189",
          desc: "Algodão 100% penteado super macio com bordado de alta densidade do símbolo sagrado.",
          tag: "Edição Especial",
          rating: "5.0 ★★★★★",
        },
        {
          id: "tshirt-pyramid",
          title: "Camiseta Tech Cânone de Gizé (φ & π)",
          category: "apparel",
          price: "R$ 89",
          desc: "Algodão premium sustentável com estampa em relevo da geometria sagrada e coordenadas astronômicas.",
          tag: "Algodão Premium",
          rating: "4.8 ★★★★★",
        },
        {
          id: "mug-gold",
          title: "Caneca de Cerâmica Negra & Sol de Rá",
          category: "accessories",
          price: "R$ 49",
          desc: "Cerâmica fosca de alta qualidade com acabamento em brilho dourado e símbolo Ankh.",
          tag: "Caneca 350ml",
          rating: "4.9 ★★★★★",
        },
        {
          id: "cap-djed",
          title: "Boné Snapback Pilar Djed Minimalista",
          category: "accessories",
          price: "R$ 79",
          desc: "Ajuste perfeito com fecho regulável e bordado frontal discreto do pilar de Osíris.",
          tag: "Acessório Oficial",
          rating: "4.9 ★★★★★",
        },
        {
          id: "course-astronomy",
          title: "Curso: Arqueoastronomia das Necrópoles",
          category: "courses",
          price: "R$ 249",
          desc: "Aprenda como os egípcios mapeavam o cinturão de Órion, a precessão e o alinhamento com os pontos cardeais.",
          tag: "Formação Avançada",
          rating: "5.0 ★★★★★",
        },
      ],
    },
    math: {
      tag: "Tratado Científico II",
      title: "O Cânone Matemático & A Geometria Sagrada",
      subtitle: "Milenos antes da academia grega, os mestres do Nilo já codificavam a geometria da Terra e do cosmos através de cálculos monumentais, astronomia de alta precisão e acústica piezoelétrica.",
      source: "Fonte",
      canonicalEq: "Eq. Canônica",
      evidenceTitle: "Evidências Documentadas & Experimentos:",
      tolerance: "TOLERÂNCIA: ±0.05%",
      sacredMath: "Matemática Sagrada",
      topics: {
        rhind: {
          title: "O Papiro de Rhind & A Quadratura",
          subtitle: "Problema 50 do escriba Ahmes (c. 1650 a.C.)",
          badge: "1650 a.C. • British Museum EA 10057",
          desc: "Mais de mil anos antes de Arquimedes, os escribas egípcios deduziram uma das mais refinadas aproximações de Pi (π ≈ 3,16049). A regra consistia em subtrair 1/9 do diâmetro de um campo circular e construir um quadrado com o segmento resultante.",
          details: [
            "Frações Unitárias: O cálculo egípcio operava exclusivamente com frações com numerador 1 (como 1/2, 1/3, 1/7), exigindo tabelas de decomposição de extrema complexidade cognitiva (como a tabela 2/n).",
            "Triângulo Sagrado 3-4-5: Os harpedonaptai ('estiradores de cordas') utilizavam nós equidistantes em cordas para produzir ângulos retos perfeitos de 90° em fundações astronômicas.",
            "Cálculo de Volume Troncocônico: O Papiro de Moscou (Problema 14) demonstra a fórmula correta do tronco de pirâmide: V = (h/3)(a² + ab + b²), considerada o apogeu da geometria pré-helênica."
          ],
          source: "Papiro Matemático Rhind, Tebas (Dinastia XV)"
        },
        cubit: {
          title: "O Côvado Real (Meh Niswt)",
          subtitle: "A Razão Áurea (φ) e a Cosmometria Corporal",
          badge: "52,36 cm • Padrão de Granito e Basalto",
          desc: "O Côvado Real não era uma medida arbitrária, mas uma fusão entre o ciclo lunar sideral (28 dias) e a geometria geodésica da Terra. Surpreendentemente, 52,36 cm é exatamente a diferença entre π e φ² em metros (π - φ² ≈ 0,5236), revelando uma sofisticação de proporções sem paralelos.",
          details: [
            "Subdivisão Fracionária de Precisão: O vigésimo oitavo dedo era subdividido em até 1/16 de dedo, permitindo tolerâncias construtivas inferiores a 0,5 milímetro nas juntas de calcário de Tura.",
            "Razão Áurea (φ) na Grande Pirâmide: A altura da apótema dividida pela metade da base resulta em 1,6181 — correspondência quase perfeita com o número de ouro com desvio de 0,1%.",
            "Padrões Mestres em Pedra: Barras de côvado eram esculpidas em madeira de lei ou diorito e guardadas em templos; mestres-de-obras eram obrigados a calibrar suas réguas em cada lua cheia sob pena capital."
          ],
          source: "Régua de Côvado Real de Maya, Museu do Louvre (Dinastia XVIII)"
        },
        acoustic: {
          title: "Ressonância Acústica & Efeito Piezoelétrico",
          subtitle: "Frequência Harmônica da Câmara do Rei",
          badge: "432 Hz • Granito Vermelho de Assuã",
          desc: "As paredes e o sarcófago monolítico da Câmara do Rei foram esculpidos em granito rosa de Assuã, rocha composta por até 55% de cristais de quartzo e feldspato. Medições acústicas modernas registraram frequências de ressonância estacionária entre 117 Hz e 432 Hz, capazes de amplificar harmônicos infra-sônicos.",
          details: [
            "Caixas Ressonadoras Superiores: Acima da câmara existem 5 camadas de vigas monolíticas de granito de 50 a 70 toneladas, separadas por câmaras de descompressão ocas que agem como defletores acústicos gigantescos.",
            "Sarcófago Usinado por Ressonância: O cofre monolítico apresenta marcas de corte helicoidal com taxa de avanço de 2,5 mm por rotação, sugerindo ferramentas de perfuração com assistência ultrassônica por abrasão de quartzo.",
            "Sensação Psicoacústica: Pesquisadores do Royal Institute documentaram que a vibração ressonante contínua altera estados de ondas cerebrais humanas para alfa (8-12 Hz) e teta (4-7 Hz)."
          ],
          source: "Medições Acústicas de Flinders Petrie & Dr. Joseph Davidovits"
        }
      }
    },
    necropolis: {
      tag: "Atlas Arqueológico",
      title: "Topografia das Grandes Necrópoles",
      subtitle: "Navegue pelos maiores sítios sagrados do Nilo através de dados geofísicos, muografia de partículas cósmicas e escavações arqueológicas do último século.",
      anomaliesTitle: "Descobertas Tomográficas & Registros Estruturais:",
      excavationRecord: "Registro de Escavação",
      academicDoc: "DOC ACADÊMICO",
      keyDiscoveryTag: "Marco Arqueológico Principal",
      georefCoords: "COORDENADAS GEOREFERENCIADAS",
      satellite: "Datum WGS84 • Satélite Sentinel-2",
      sites: {
        giza: {
          name: "Planalto de Gizé",
          location: "Baixo Egito • Margem Oeste do Nilo",
          dynasty: "IV Dinastia (c. 2589–2504 a.C.)",
          age: "4.500+ Anos",
          keyDiscovery: "Muografia Cósmica ScanPyramids (2017–2023)",
          desc: "O platô cárstico de Gizé abriga a tríade Khufu (Quéops), Khafre (Quéfren) e Menkaure (Miquerinos). As quatro faces da Grande Pirâmide estão alinhadas aos pontos cardeais astronômicos com um desvio médio de apenas 3/60 de um grau (0,05°), superando a precisão do Observatório Real de Greenwich construído em 1675.",
          anomalies: [
            "O 'Grande Vazio' de 30 Metros: Detectado por muografia de múons cósmicos pela Universidade de Nagoya e CEA França, um vazio oculto de mais de 30 metros de extensão flutua exatamente acima da Grande Galeria.",
            "Corredor Oculto da Face Norte: Em março de 2023, um endoscópio ótico de 6 mm confirmou um corredor em empena com 9 metros de comprimento e 2 metros de largura até então desconhecido.",
            "Conexão com a Água Subterrânea: A 30 metros sob a Esfinge e a Grande Pirâmide, o Poço de Osíris abriga três níveis de câmaras inundadas que conectavam os monumentos ao aquífero natural do Nilo."
          ],
          data: [
            { label: "Massa Total Estimada", value: "6.000.000 t" },
            { label: "Blocos de Calcário", value: "≈ 2.300.000" },
            { label: "Precisão do Norte", value: "3' 6\" de arco" },
            { label: "Desnível da Base", value: "< 1.5 cm" }
          ]
        },
        saqqara: {
          name: "Complexo de Sacará",
          location: "Mênfis • Planalto Desértico",
          dynasty: "III Dinastia (c. 2670–2650 a.C.)",
          age: "4.700+ Anos",
          keyDiscovery: "O Labirinto Subterrâneo de Imhotep",
          desc: "A Pirâmide de Degraus do Faraó Djoser marca a gênese da arquitetura monumental em pedra cortada na Terra, idealizada pelo sumo sacerdote e polímata Imhotep. Sob a pirâmide estende-se uma colossal cidade subterrânea escavada na rocha calcária.",
          anomalies: [
            "5,7 km de Galerias Subterrâneas: Uma rede labiríntica de túneis, poços verticais de 28 metros e câmaras revestidas com mais de 36.000 azulejos de faiança azul-turquesa.",
            "Coleção de 40.000 Vasos Pré-Dinásticos: Descobertos em poços selados, milhares de vasos e taças esculpidos em materiais de extrema dureza como diorito, basalto e xisto, com paredes finas de milímetros e simetria de torno mecânico.",
            "Serapeu de Sacará: Catacumbas contendo 24 sarcófagos monolíticos de granito preto e diorito pesando entre 70 e 100 toneladas cada, com tolerâncias de planeza ótica milimétrica."
          ],
          data: [
            { label: "Extensão de Túneis", value: "5.700 metros" },
            { label: "Degraus Monumentais", value: "6 Níveis" },
            { label: "Vasos Recuperados", value: "+40.000 peças" },
            { label: "Peso dos Sarcófagos", value: "70 a 100 t" }
          ]
        },
        kings_valley: {
          name: "Vale dos Reis (Wadi al-Muluk)",
          location: "Tebas Ocidental • Luxor",
          dynasty: "XVIII a XX Dinastias (c. 1550–1077 a.C.)",
          age: "3.500+ Anos",
          keyDiscovery: "Textos Herméticos do Pós-Morte",
          desc: "O cemitério sagrado dos faraós do Império Novo, escavado no cânion de calcário coroado pela montanha natural em formato de pirâmide (al-Qurn). Cada tumba é um livro cosmológico tridimensional esculpido e pintado na rocha viva.",
          anomalies: [
            "Tumba KV17 (Seti I): A mais profunda e extensa do vale (137 metros), pintada com os textos completos do 'Amduat' e do 'Livro dos Portões', mantendo pigmentos intactos após 3.300 anos.",
            "Química do Azul Egípcio: O primeiro pigmento sintético da história (CaCuSi₄O₁₀), com propriedades de emissão de radiação infravermelha próxima (NIR) de alto rendimento energético quando iluminado.",
            "KV62 (Tutankhamon): Descoberta intacta por Howard Carter em 1922 com mais de 5.398 artefatos de ouro maciço, marfim e ferro meteorítico (lâmina de adaga forjada a partir de meteorito de níquel-ferro)."
          ],
          data: [
            { label: "Tumbas Catalogadas", value: "65 KV" },
            { label: "Profundidade Máx. (KV17)", value: "137 metros" },
            { label: "Artefatos em KV62", value: "5.398 itens" },
            { label: "Composição da Adaga", value: "Ferro Meteorítico" }
          ]
        },
        abydos: {
          name: "Ábidos & Dendera",
          location: "Médio e Alto Egito",
          dynasty: "I Dinastia ao Período Ptolemaico",
          age: "5.000+ Anos",
          keyDiscovery: "O Osireion Megalítico & O Zodíaco Celestial",
          desc: "Ábidos foi o epicentro do culto a Osíris e centro necropolítico primordial. Atrás do templo de Seti I jaz o enigmático Osireion, erigido com megálitos de granito de até 100 toneladas em um estilo arquitetônico anepigráfico sem paralelo com outros templos egípcios.",
          anomalies: [
            "Megalitismo do Osireion: Blocos ciclópicos de granito vermelho sem argamassa, submersos em um lençol freático permanente, atribuídos por arqueólogos alternativos a fases pré-dinásticas arcaicas.",
            "O Zodíaco de Dendera: Um relevo celeste esculpido no teto do Templo de Hathor que registra a precessão dos equinócios e a constelação de Órion (hoje preservado no Museu do Louvre).",
            "Lista de Reis de Ábidos: Registro genealógico canónico de 76 faraós que preservou a cronologia das dinastias para a posteridade acadêmica moderna."
          ],
          data: [
            { label: "Blocos do Osireion", value: "Até 100 t" },
            { label: "Reis Catalogados", value: "76 Faraós" },
            { label: "Diâmetro do Zodíaco", value: "2.55 metros" },
            { label: "Profundidade Freática", value: "Nível Permanente" }
          ]
        }
      }
    },
    lexicon: {
      tag: "Semiótica & Epigrafia",
      title: "Léxico Sagrado: A Ciência dos Símbolos",
      subtitle: "Cada glifo esculpido nas pedras milenares não era apenas uma letra, mas um compêndio de matemática fracionária, biologia observacional e metafísica aplicada.",
      decompositionTitle: "Decomposição Analítica dos Componentes:",
      symbols: {
        wedjat: {
          name: "O Olho de Hórus",
          meaning: "A Métrica Médica Fracionária & O Olho da Percepção",
          insight: "Longe de ser mero adorno místico, o Olho de Hórus constituía a base do sistema métrico farmacêutico no Egito faraônico. As seis partes do olho decomposto representavam as frações binárias de medidas de grãos e medicamentos (medida Heqat), cada uma associada a um sentido biológico humano.",
          quote: "A soma das seis frações totaliza 63/64. O 1/64 faltante é a fração divina reconstituída por Thoth, o inventor da escrita e da matemática.",
          attrs: [
            { symbolPart: "Canto Interno", meaning: "Olfato (Sentido do Aroma Sagrado)", ratio: "1/2 (0.500)" },
            { symbolPart: "Pupila Central", meaning: "Visão (A Percepção Luminosa)", ratio: "1/4 (0.250)" },
            { symbolPart: "Sobrancelha Curva", meaning: "Intelecto / Pensamento Racional", ratio: "1/8 (0.125)" },
            { symbolPart: "Canto Externo", meaning: "Audição (A Escuta da Harmonia)", ratio: "1/16 (0.0625)" },
            { symbolPart: "Traço Espiral Inferior", meaning: "Paladar (A Brotação da Espiga)", ratio: "1/32 (0.03125)" },
            { symbolPart: "Traço Vertical Reto", meaning: "Tato (O Toque Físico na Terra)", ratio: "1/64 (0.015625)" }
          ]
        },
        ankh: {
          name: "A Chave da Vida",
          meaning: "A Fusão das Polaridades & A Respiração Cósmica",
          insight: "O Ankh representa a síntese biológica e cosmológica da vida. A alça superior oval simboliza o princípio gerador feminino e o circuito fechado de energia; o eixo vertical representa a emanação masculina telúrica; e a travessa horizontal marca o horizonte (Akhet) onde o Sol renasce a cada alvorecer.",
          quote: "'Eu te concedo toda a vida, estabilidade e domínio, toda a saúde e toda a alegria do coração como a de Rá, eternamente.' — Templo de Karnak",
          attrs: [
            { symbolPart: "Alça Oval Superior", meaning: "Circuito Energético Fechado / Céu Infinito", ratio: "Eternidade (Djet)" },
            { symbolPart: "Barra Horizontal", meaning: "O Horizonte Divino / Ponto de Transição", ratio: "Equilíbrio (Ma'at)" },
            { symbolPart: "Haste Vertical", meaning: "Condutor Telúrico / Eixo da Terra", ratio: "Fundação (Ptah)" },
            { symbolPart: "Ritual Respiratório", meaning: "Posicionado nas narinas dos reis para infusão do sopro Ka", ratio: "Força Vital" }
          ]
        },
        djed: {
          name: "O Pilar Djed",
          meaning: "A Coluna de Osíris & A Estabilidade Tectônica",
          insight: "Considerado um dos hieróglifos mais antigos (encontrado em cerâmicas pré-dinásticas de Nacada II), o Djed representa a coluna vertebral de Osíris restaurada. No plano técnico, sua forma com quatro anéis toroidais superpostos inspirou pesquisadores a compará-lo a isoladores dielétricos modernos.",
          quote: "'Levanta-te, ó Osíris! Tens tua coluna de volta. Ó ser de coração quieto, tens tuas vértebras ajustadas!' — Textos das Pirâmides",
          attrs: [
            { symbolPart: "Quatro Anéis", meaning: "As 4 Vértebras Cervicais / Quatro Pilares do Céu", ratio: "Tetráfora" },
            { symbolPart: "Haste Monolítica", meaning: "Tronco de Cedro da Fenícia que encerrou Osíris", ratio: "Eixo Cósmico" },
            { symbolPart: "Festa de Sed", meaning: "Cerimônia de 'Erigir o Djed' para restauração do vigor cósmico", ratio: "Ano Jubilar" },
            { symbolPart: "Amuleto de Proteção", meaning: "Colocado sobre a coluna vertebral da múmia no Livro dos Mortos", ratio: "Capítulo 155" }
          ]
        },
        khepri: {
          name: "O Escaravelho Sagrado",
          meaning: "Astrobiologia & A Metamorfose Solar",
          insight: "Em 2013, biólogos da Universidade de Lund comprovaram que o Scarabaeus sacer é o único inseto capaz de navegar orientando-se pelo brilho da Via Láctea. Os antigos egípcios já haviam observado esse vínculo astronômico há 4.000 anos, associando o escaravelho ao deus Khepri que rola o Sol pelo céu noturno.",
          quote: "'Ó meu coração de minha mãe! Não te levantes como testemunha contra mim no tribunal da pesagem!' — Inscrição nos Escaravelhos de Coração de Jaspe",
          attrs: [
            { symbolPart: "Esfera de Esterco", meaning: "O Disco Solar (Aten) conduzido pelo cosmos", ratio: "Translação Solar" },
            { symbolPart: "Ciclo Subterrâneo", meaning: "Ovos enterrados que eclodem como nova vida espontânea", ratio: "Ressurreição" },
            { symbolPart: "Escaravelho de Coração", meaning: "Amuleto verde colocado sobre o tórax da múmia", ratio: "Capítulo 30B" },
            { symbolPart: "Navegação Estelar", meaning: "Orientação comprovada pelo gradiente estelar da Via Láctea", ratio: "Astro-Navegação" }
          ]
        }
      }
    },
    eng: {
      tag: "Mecânica & Arquitetura",
      title: "Crônicas de Engenharia: Como Foi Construído?",
      subtitle: "A desmistificação das maiores façanhas estruturais da Antiguidade através de evidências arqueológicas contemporâneas, diários originais de operários e física dos materiais.",
      tagStudy: "Estudo de Engenharia",
      primaryEvidence: "Evidência Primária Arqueológica:",
      paramsTitle: "Parâmetros Físicos e Mecânicos:",
      empiricValidation: "Validação empírica reproduzível em laboratório moderno",
      studies: {
        sand_friction: {
          title: "A Física da Areia Úmida",
          subtitle: "Validação Experimental da Universidade de Amsterdã (2014)",
          principle: "Pontes Capilares & Coeficiente de Atrito μ reduzido em 50%",
          evidence: "Pintura mural da Tumba de Djehutihotep, El-Bersha (c. 1880 a.C.)",
          desc: "Durante décadas, historiadores acreditaram que o homem derramando líquido à frente do trenó de 172 homens na tumba de Djehutihotep realizava um ritual religioso. Em 2014, o físico Dr. Daniel Bonn demonstrou que a umidade exata (2% a 5% de água) forma micro-pontes capilares entre os grãos de areia, dobrando a rigidez do solo e reduzindo a força de tração necessária pela metade.",
          points: [
            { label: "Massa da Estátua", metric: "58 Toneladas" },
            { label: "Redução de Arrasto", metric: "-50% de Atrito" },
            { label: "Força por Operário", metric: "≈ 35 kgf / homem" },
            { label: "Umidade Crítica", metric: "2% a 5% H₂O" }
          ]
        },
        merer_papyrus: {
          title: "O Diário de Merer & Os Canais do Nilo",
          subtitle: "O Mais Antigo Registro Escrito de um Construtor da Pirâmide (c. 2560 a.C.)",
          principle: "Empuxo Hidrostático de Arquimedes na Estação Akhet",
          evidence: "Papiros de Wadi al-Jarf, Mar Vermelho (Descobertos em 2013)",
          desc: "Descoberto pelo egiptólogo Pierre Tallet em cavernas portuárias artificiais no Mar Vermelho, o diário de bordo do inspetor Merer descreve a logística diária de transporte de blocos de calcário branco fino de Tura até o platô de Gizé. O transporte era realizado por barcaças de madeira amarrada que navegavam canais artificiais inundados pela cheia do Nilo (estação Akhet), descarregando as pedras a poucos metros da base da pirâmide.",
          points: [
            { label: "Equipe de Merer", metric: "40 Marinheiros" },
            { label: "Ciclo de Viagem", metric: "2 Dias / Carga" },
            { label: "Datação do Papiro", metric: "Ano 27 de Khufu" },
            { label: "Distância Fluvial", metric: "15 km por trecho" }
          ]
        },
        tubular_drills: {
          title: "Brocas Tubulares & Abrasão por Quartzo",
          subtitle: "A Usinagem Mecânica de Granito e Diorito no Reino Antigo",
          principle: "Abrasão por Cisalhamento sob Pressão Estática Contínua",
          evidence: "Núcleos de Perfuração e Marcas de Serra de Flinders Petrie",
          desc: "Sir William Flinders Petrie catalogou dezenas de orifícios cilíndricos e testemunhos de rocha de granito em Gizé com sulcos helicoidais regulares de até 2,5 mm por volta. Os artesãos utilizavam tubos de cobre desprovidos de dentes, acionados por arcos de pua, onde a ação cortante era executada por grãos microscópicos de areia de quartzo (dureza 7 Mohs) ou pó de esmeril suspensos em óleo sob compressão vertical de contrapesos.",
          points: [
            { label: "Dureza do Quartzo", metric: "7 Mohs" },
            { label: "Passo Helicoidal", metric: "2.5 mm / volta" },
            { label: "Material do Tubo", metric: "Cobre Arsenical" },
            { label: "Velocidade Linear", metric: "Atrito Assistido" }
          ]
        },
        internal_ramp: {
          title: "A Teoria da Rampa Interna em Espiral",
          subtitle: "Modelo Arquitetônico de Jean-Pierre Houdin e ScanPyramids",
          principle: "Vantagem Mecânica com Inclinação Constante de 7% (4°)",
          evidence: "Microgravimetria EDF (1986) e Detecção Térmica FLIR (2015)",
          desc: "Uma rampa linear externa até o cume da Grande Pirâmide exigiria 3 milhões de metros cúbicos de material — mais que a própria pirâmide. O arquiteto Jean-Pierre Houdin propôs que uma rampa externa ergueu os primeiros 43 metros, enquanto o restante de 70% do volume foi instalado por uma rampa em espiral embutida dentro do próprio corpo da pirâmide, cujas esquinas abertas permitiam girar os blocos com gruas de alavanca.",
          points: [
            { label: "Inclinação da Rampa", metric: "7% (4 graus)" },
            { label: "Material Economizado", metric: "≈ 80% vs Externa" },
            { label: "Espiral Interna", metric: "Embutida a 10-15m" },
            { label: "Confirmação Térmica", metric: "Câmaras FLIR (2015)" }
          ]
        }
      }
    },
    footer: {
      quotePetrie: "“A exatidão da Grande Pirâmide pode ser comparada ao trabalho de um relojoeiro de precisão, porém materializada em acres de blocos de muitas toneladas.”",
      authorPetrie: "Sir William Flinders Petrie (1883)",
      subPetrie: "• Pai da Arqueologia Científica",
      quoteChampollion: "“Eu sou inteiramente do Egito, e ele é tudo para mim... decifrei o alfabeto dos deuses e dos homens da primeira grande civilização da Terra.”",
      authorChampollion: "Jean-François Champollion (1822)",
      subChampollion: "• Decifrador da Pedra de Roseta",
      timelineTitle: "Eixos Cronológicos da Civilização do Nilo",
      brandDesc: "Iniciativa de difusão de arqueoastronomia, epigrafia hieroglífica e engenharia megalítica fundamentada em dados geofísicos, medições a laser e documentos de escavação centenários.",
      dossiersTitle: "Dossiês Temáticos",
      museumsTitle: "Acervos & Museus",
      copyright: "CÓDIGOS EGÍPCIOS • DEDICADO À MEMÓRIA DOS ESCRIBAS E MESTRES CONSTRUTORES DO NILO.",
      preservation: "PRESERVAÇÃO DO PATRIMÔNIO HISTÓRICO",
      whatsappTooltip: "Fale Conosco",
    }
  },
  en: {
    nav: {
      solutions: "Solutions",
      documentary: "Documentary",
      resources: "Resources",
      about: "About",
      store: "Store",
      login: "Sign in",
      getStarted: "Get started",
    },
    hero: {
      kicker: "Unraveling the",
      headline1: "Egyptian",
      headline2: "Codes",
      subtitle: "A journey through mysteries, symbols, and knowledge that spanned millennia.",
      exploreBtn: "Explore documentary",
      trailerBtn: "Watch trailer",
      feature1: "True History",
      feature2: "Ancient Symbols",
      feature3: "Secret Knowledge",
      feature4: "A World Legacy",
    },
    carousel: {
      tag: "Recognition & Scholarly Research",
      title: "Inspired By The World's Greatest Institutions",
    },
    bento: {
      card1Title: "Instant Hieroglyphic Decipherment",
      card1Tag: "IMMEDIATE ACCESS",
      card1Desc: "4K HDR File • 3D Scan",
      card2Tag: "EGYPTIAN CODE • COSMIC AI",
      card2Title: "THE COSMIC PORTAL OF ANCIENT WISDOM",
      card3Title: "Spectral Vision",
      card3Sub: "Active 3D Lidar",
      card4Number: "25M",
      card4Label: "cataloged inscriptions",
      card5Title: "Sacred Archives",
      card5Desc: "Real papyri and 3D models ready for photogrammetric analysis.",
      card5Badge1: "100% Unseen",
      card5Badge2: "• Transliterate",
      card6Btn: "+ EXPLORE ARCHIVE",
      card6ActiveCount: "12K",
      card6ActiveLabel: "ACTIVE RESEARCHERS",
      cartographyTitle: "Stellar Cartography",
      cartographyDesc: "3D mapping of the millennial correlation between Giza monuments and Orion's belt.",
      epigraphicTitle: "Epigraphic Engine",
      epigraphicDesc: "Instant neural transliteration of hieroglyphs sealed in subterranean chambers.",
    },
    storeSection: {
      tag: "Official Collection & Masterclasses",
      title: "Artifacts & Masterclasses Store",
      subtitle: "Wear the ancient wisdom of the Nile and master Egyptology and archaeoastronomy secrets through our exclusive courses and premium apparel.",
      filterAll: "All Items",
      filterCourses: "Courses & Masterclasses",
      filterApparel: "Premium Apparel",
      filterAccessories: "Accessories & Mugs",
      buyBtn: "Get It Now",
      badgeNew: "Exclusive",
      items: [
        {
          id: "course-master",
          title: "Masterclass: Epigraphy & Hieroglyph Reading",
          category: "courses",
          price: "$ 39",
          desc: "Comprehensive online course from basic to advanced with digital certificate of completion and study materials.",
          tag: "Online Course • 40h",
          rating: "4.9 ★★★★★",
        },
        {
          id: "hoodie-eye",
          title: "Oversized Eye of Horus (Wedjat) Hoodie",
          category: "apparel",
          price: "$ 59",
          desc: "100% super soft combed cotton with high-density gold embroidery.",
          tag: "Special Edition",
          rating: "5.0 ★★★★★",
        },
        {
          id: "tshirt-pyramid",
          title: "Giza Canon Tech T-Shirt (φ & π)",
          category: "apparel",
          price: "$ 25",
          desc: "Sustainable premium cotton with 3D print of sacred geometry and coordinates.",
          tag: "Premium Cotton",
          rating: "4.8 ★★★★★",
        },
        {
          id: "mug-gold",
          title: "Matte Black & Ra Gold Ceramic Mug",
          category: "accessories",
          price: "$ 18",
          desc: "High quality matte ceramic with gold print finish and engraved Ankh emblem.",
          tag: "Ceramic 350ml",
          rating: "4.9 ★★★★★",
        },
        {
          id: "cap-djed",
          title: "Minimalist Djed Pillar Snapback Cap",
          category: "accessories",
          price: "$ 22",
          desc: "Perfect fit with adjustable strap and embroidered Osiris Djed pillar.",
          tag: "Official Apparel",
          rating: "4.9 ★★★★★",
        },
        {
          id: "course-astronomy",
          title: "Course: Archaeoastronomy of the Pyramids",
          category: "courses",
          price: "$ 49",
          desc: "Learn how ancient Egyptians mapped Orion's belt, precession, and cardinal alignment.",
          tag: "Advanced Program",
          rating: "5.0 ★★★★★",
        },
      ],
    },
    math: {
      tag: "Scientific Treatise II",
      title: "The Mathematical Canon & Sacred Geometry",
      subtitle: "Millennia before the Greek academy, Nile masters encoded Earth and cosmic geometry through monumental calculations, high-precision astronomy, and piezoelectric acoustics.",
      source: "Source",
      canonicalEq: "Canonical Eq.",
      evidenceTitle: "Documented Evidence & Experiments:",
      tolerance: "TOLERANCE: ±0.05%",
      sacredMath: "Sacred Mathematics",
      topics: {
        rhind: {
          title: "The Rhind Papyrus & Squaring",
          subtitle: "Problem 50 by scribe Ahmes (c. 1650 BC)",
          badge: "1650 BC • British Museum EA 10057",
          desc: "Over a thousand years before Archimedes, Egyptian scribes deduced one of the most refined approximations of Pi (π ≈ 3.16049). The rule consisted of subtracting 1/9 of a circular field's diameter and constructing a square with the resulting segment.",
          details: [
            "Unit Fractions: Egyptian calculation operated exclusively with fractions having numerator 1 (like 1/2, 1/3, 1/7), requiring decomposition tables of extreme cognitive complexity (like the 2/n table).",
            "3-4-5 Sacred Triangle: Harpedonaptai ('rope stretchers') used equidistant knots on ropes to produce perfect 90° right angles in astronomical foundations.",
            "Truncated Pyramid Volume: Moscow Papyrus (Problem 14) demonstrates the correct frustum formula: V = (h/3)(a² + ab + b²), considered the apex of pre-Hellenic geometry."
          ],
          source: "Rhind Mathematical Papyrus, Thebes (15th Dynasty)"
        },
        cubit: {
          title: "The Royal Cubit (Meh Niswt)",
          subtitle: "Golden Ratio (φ) & Body Cosmometry",
          badge: "52.36 cm • Granite and Basalt Standard",
          desc: "The Royal Cubit was not an arbitrary measure, but a fusion between the sidereal lunar cycle (28 days) and Earth's geodesic geometry. Surprisingly, 52.36 cm is exactly the difference between π and φ² in meters (π - φ² ≈ 0.5236), revealing unprecedented proportional sophistication.",
          details: [
            "Precision Fractional Subdivisions: The 28th digit was subdivided into 1/16 of a digit, allowing construction tolerances under 0.5 mm in Tura limestone joints.",
            "Golden Ratio (φ) in Great Pyramid: Apothem height divided by half base yields 1.6181 — near-perfect golden ratio match with 0.1% deviation.",
            "Master Stone Standards: Cubit rods were carved in hardwood or diorite and kept in temples; master builders calibrated their rods every full moon under penalty of death."
          ],
          source: "Royal Cubit Rod of Maya, Louvre Museum (18th Dynasty)"
        },
        acoustic: {
          title: "Acoustic Resonance & Piezoelectric Effect",
          subtitle: "Harmonic Frequency of the King's Chamber",
          badge: "432 Hz • Aswan Red Granite",
          desc: "The walls and monolithic sarcophagus of the King's Chamber were carved from Aswan rose granite, containing up to 55% quartz and feldspar crystals. Modern acoustic measurements recorded standing resonance frequencies between 117 Hz and 432 Hz, capable of amplifying infrasonic harmonics.",
          details: [
            "Upper Resonating Chambers: Above the chamber lie 5 layers of monolithic granite beams (50-70 tons), separated by hollow stress-relieving chambers acting as giant acoustic baffles.",
            "Resonance-Machined Sarcophagus: The coffer exhibits helical saw marks with 2.5 mm feed rate per turn, suggesting ultrasonic-assisted drilling using quartz slurry abrasive.",
            "Psychoacoustic Sensation: Royal Institute researchers documented that continuous resonant vibration shifts human brainwave states to alpha (8-12 Hz) and theta (4-7 Hz)."
          ],
          source: "Acoustic Measurements by Flinders Petrie & Dr. Joseph Davidovits"
        }
      }
    },
    necropolis: {
      tag: "Archaeological Atlas",
      title: "Topography of Great Necropolises",
      subtitle: "Explore Nile's sacred sites through geophysical data, cosmic particle muography, and past century archaeological excavations.",
      anomaliesTitle: "Tomographic Discoveries & Structural Logs:",
      excavationRecord: "Excavation Record",
      academicDoc: "ACADEMIC DOC",
      keyDiscoveryTag: "Key Archaeological Landmark",
      georefCoords: "GEOREFERENCED COORDINATES",
      satellite: "WGS84 Datum • Sentinel-2 Satellite",
      sites: {
        giza: {
          name: "Giza Plateau",
          location: "Lower Egypt • West Bank of the Nile",
          dynasty: "4th Dynasty (c. 2589–2504 BC)",
          age: "4,500+ Years",
          keyDiscovery: "ScanPyramids Cosmic Muography (2017–2023)",
          desc: "Giza karst plateau hosts Khufu, Khafre, and Menkaure. The Great Pyramid's four faces align to astronomical cardinal points with an average deviation of just 3/60 of a degree (0.05°), surpassing the 1675 Royal Observatory at Greenwich.",
          anomalies: [
            "30-Meter 'Big Void': Detected by cosmic ray muon radiography by Nagoya University & CEA France, a hidden void over 30m long floats right above the Grand Gallery.",
            "North Face Hidden Corridor: In March 2023, a 6mm optical endoscope confirmed a gabled corridor 9m long and 2m wide previously unknown.",
            "Groundwater Connection: 30 meters beneath the Sphinx and Great Pyramid, Osiris Shaft contains three levels of flooded chambers connecting to Nile's natural aquifer."
          ],
          data: [
            { label: "Est. Total Mass", value: "6,000,000 t" },
            { label: "Limestone Blocks", value: "≈ 2,300,000" },
            { label: "North Accuracy", value: "3' 6\" arcmin" },
            { label: "Base Level Shift", value: "< 1.5 cm" }
          ]
        },
        saqqara: {
          name: "Saqqara Complex",
          location: "Memphis • Desert Plateau",
          dynasty: "3rd Dynasty (c. 2670–2650 BC)",
          age: "4,700+ Years",
          keyDiscovery: "Imhotep's Underground Labyrinth",
          desc: "Pharaoh Djoser's Step Pyramid marks the genesis of monumental cut stone architecture on Earth, designed by high priest polymath Imhotep. A colossal subterranean city stretches underneath.",
          anomalies: [
            "5.7 km Underground Galleries: Labyrinthine tunnel network, 28m vertical shafts, and chambers lined with over 36,000 turquoise faience tiles.",
            "40,000 Pre-Dynastic Vases: Sealed shaft discoveries of thousands of vessels carved in ultra-hard diorite, basalt, and schist with millimeter wall thickness and lathe symmetry.",
            "Serapeum of Saqqara: Catacombs housing 24 monolithic black granite and diorite sarcophagi weighing 70-100 tons each with optical flatness tolerances."
          ],
          data: [
            { label: "Tunnel Length", value: "5,700 meters" },
            { label: "Monumental Steps", value: "6 Tiers" },
            { label: "Recovered Vases", value: "+40,000 items" },
            { label: "Sarcophagus Weight", value: "70 to 100 t" }
          ]
        },
        kings_valley: {
          name: "Valley of the Kings",
          location: "West Thebes • Luxor",
          dynasty: "18th to 20th Dynasties (c. 1550–1077 BC)",
          age: "3,500+ Years",
          keyDiscovery: "Hermetic Afterlife Texts",
          desc: "Sacred burial ground of New Kingdom pharaohs carved into limestone canyon beneath the natural pyramid mountain (al-Qurn). Each tomb is a 3D cosmological book painted into bedrock.",
          anomalies: [
            "Tomb KV17 (Seti I): Deepest and longest (137m), fully painted with 'Amduat' and 'Book of Gates', maintaining intact pigments after 3,300 years.",
            "Egyptian Blue Chemistry: History's first synthetic pigment (CaCuSi₄O₁₀), emitting near-infrared (NIR) radiation with high quantum yield when illuminated.",
            "KV62 (Tutankhamun): Discovered intact by Howard Carter in 1922 containing over 5,398 gold artifacts, ivory, and a meteoric iron dagger forged from nickel-iron meteorite."
          ],
          data: [
            { label: "Cataloged Tombs", value: "65 KV" },
            { label: "Max Depth (KV17)", value: "137 meters" },
            { label: "KV62 Artifacts", value: "5,398 items" },
            { label: "Dagger Material", value: "Meteoric Iron" }
          ]
        },
        abydos: {
          name: "Abydos & Dendera",
          location: "Middle & Upper Egypt",
          dynasty: "1st Dynasty to Ptolemaic Period",
          age: "5,000+ Years",
          keyDiscovery: "Megalithic Osireion & Celestial Zodiac",
          desc: "Abydos was Osiris cult epicenter. Behind Seti I temple lies the enigmatic Osireion built with 100-ton granite megaliths in an anepigraphic style unequaled elsewhere in Egypt.",
          anomalies: [
            "Osireion Megalithism: Mortarless red granite blocks submerged in permanent groundwater table, attributed by alternative archaeologists to archaic pre-dynastic eras.",
            "Dendera Zodiac: Celestial relief carved on Hathor Temple ceiling recording equinox precession and Orion constellation (now in Louvre Museum).",
            "Abydos King List: Canonical genealogical record of 76 pharaohs preserving dynastic chronology for modern scholars."
          ],
          data: [
            { label: "Osireion Blocks", value: "Up to 100 t" },
            { label: "Cataloged Kings", value: "76 Pharaohs" },
            { label: "Zodiac Diameter", value: "2.55 meters" },
            { label: "Groundwater Level", value: "Permanent Table" }
          ]
        }
      }
    },
    lexicon: {
      tag: "Semiotics & Epigraphy",
      title: "Sacred Lexicon: The Science of Symbols",
      subtitle: "Each glyph carved into ancient stone was not merely a letter, but a compendium of fractional math, observational biology, and applied metaphysics.",
      decompositionTitle: "Analytical Component Decomposition:",
      symbols: {
        wedjat: {
          name: "The Eye of Horus",
          meaning: "Fractional Medical Metric & Eye of Perception",
          insight: "Far from mere mystical ornament, the Eye of Horus formed the basis of pharaonic pharmaceutical measurement. The six decomposed eye parts represented binary fractions of grain/medicine Heqat measures, each tied to a human sense.",
          quote: "The sum of the six fractions equals 63/64. The missing 1/64 is the divine fraction restored by Thoth, inventor of writing and mathematics.",
          attrs: [
            { symbolPart: "Inner Corner", meaning: "Smell (Sacred Aroma Sense)", ratio: "1/2 (0.500)" },
            { symbolPart: "Central Pupil", meaning: "Vision (Luminous Perception)", ratio: "1/4 (0.250)" },
            { symbolPart: "Curved Eyebrow", meaning: "Intellect / Rational Thought", ratio: "1/8 (0.125)" },
            { symbolPart: "Outer Corner", meaning: "Hearing (Harmony Listening)", ratio: "1/16 (0.0625)" },
            { symbolPart: "Lower Spiral", meaning: "Taste (Sprout Grain Growth)", ratio: "1/32 (0.03125)" },
            { symbolPart: "Vertical Stroke", meaning: "Touch (Physical Earth Touch)", ratio: "1/64 (0.015625)" }
          ]
        },
        ankh: {
          name: "The Key of Life",
          meaning: "Polarity Fusion & Cosmic Breath",
          insight: "Ankh represents life's biological and cosmological synthesis. The upper oval loop symbolizes female generative principle; vertical axis represents male telluric ray; horizontal bar marks Akhet horizon where Sun is reborn.",
          quote: "'I grant you all life, stability, and dominion, all health and joy of heart like Ra, forever.' — Karnak Temple",
          attrs: [
            { symbolPart: "Upper Oval Loop", meaning: "Closed Energy Circuit / Infinite Sky", ratio: "Eternity (Djet)" },
            { symbolPart: "Horizontal Bar", meaning: "Divine Horizon / Transition Point", ratio: "Balance (Ma'at)" },
            { symbolPart: "Vertical Stem", meaning: "Telluric Conductor / Earth Axis", ratio: "Foundation (Ptah)" },
            { symbolPart: "Breathing Ritual", meaning: "Placed at pharaohs' nostrils for Ka breath infusion", ratio: "Life Force" }
          ]
        },
        djed: {
          name: "The Djed Pillar",
          meaning: "Osiris Spine & Tectonic Stability",
          insight: "One of the oldest hieroglyphs (Naqada II ceramics), Djed represents Osiris' restored spine. Technically, its four stacked toroidal rings inspired comparisons to modern ceramic dielectric insulators.",
          quote: "'Rise up, O Osiris! Thou hast thy spine back. O quiet-hearted one, thy vertebrae are set!' — Pyramid Texts",
          attrs: [
            { symbolPart: "Four Rings", meaning: "4 Cervical Vertebrae / Four Sky Pillars", ratio: "Tetraphora" },
            { symbolPart: "Monolithic Shaft", meaning: "Phoenician Cedar Trunk enclosing Osiris", ratio: "Cosmic Axis" },
            { symbolPart: "Sed Festival", meaning: "'Raising the Djed' ceremony for cosmic vigor renewal", ratio: "Jubilee Year" },
            { symbolPart: "Protection Amulet", meaning: "Placed on mummy's spine in Book of the Dead", ratio: "Chapter 155" }
          ]
        },
        khepri: {
          name: "The Sacred Scarab",
          meaning: "Astrobiology & Solar Metamorphosis",
          insight: "In 2013, Lund University biologists proved Scarabaeus sacer is the only insect navigating by Milky Way light. Ancient Egyptians observed this astronomical link 4,000 years ago, connecting scarabs to god Khepri.",
          quote: "'O my heart of my mother! Rise not up as witness against me at the weighing tribunal!' — Jasper Heart Scarabs",
          attrs: [
            { symbolPart: "Dung Sphere", meaning: "The Solar Disk (Aten) rolled through space", ratio: "Solar Transit" },
            { symbolPart: "Underground Cycle", meaning: "Buried eggs hatching into spontaneous new life", ratio: "Resurrection" },
            { symbolPart: "Heart Scarab", meaning: "Green amulet placed over mummy's chest", ratio: "Chapter 30B" },
            { symbolPart: "Stellar Navigation", meaning: "Orientation proven by Milky Way stellar gradient", ratio: "Astro-Nav" }
          ]
        }
      }
    },
    eng: {
      tag: "Mechanics & Architecture",
      title: "Engineering Chronicles: How Was It Built?",
      subtitle: "Demystifying antiquity's greatest structural feats through contemporary archaeological evidence, original worker journals, and materials physics.",
      tagStudy: "Engineering Study",
      primaryEvidence: "Primary Archaeological Evidence:",
      paramsTitle: "Physical and Mechanical Parameters:",
      empiricValidation: "Empirical validation reproducible in modern lab",
      studies: {
        sand_friction: {
          title: "The Physics of Wet Sand",
          subtitle: "Experimental Validation by University of Amsterdam (2014)",
          principle: "Capillary Bridges & Friction Coefficient μ reduced by 50%",
          evidence: "Mural painting from Djehutihotep Tomb, El-Bersha (c. 1880 BC)",
          desc: "For decades, historians believed the man pouring liquid ahead of the 172-man sled in Djehutihotep's tomb performed a religious ritual. In 2014, physicist Dr. Daniel Bonn showed exact moisture (2%-5% water) forms micro capillary bridges between sand grains, doubling stiffness and halving required pulling force.",
          points: [
            { label: "Statue Mass", metric: "58 Tons" },
            { label: "Drag Reduction", metric: "-50% Friction" },
            { label: "Worker Pull Force", metric: "≈ 35 kgf / man" },
            { label: "Critical Moisture", metric: "2% to 5% H₂O" }
          ]
        },
        merer_papyrus: {
          title: "Diary of Merer & Nile Canals",
          subtitle: "Oldest Written Record of a Pyramid Builder (c. 2560 BC)",
          principle: "Archimedean Buoyancy in Akhet Inundation Season",
          evidence: "Wadi al-Jarf Papyri, Red Sea (Discovered 2013)",
          desc: "Discovered by Egyptologist Pierre Tallet in artificial Red Sea port caves, inspector Merer's logbook details daily transport logistics of fine white Tura limestone to Giza plateau. Transport was done on wooden barges navigating artificial canals flooded by Nile's Akhet high water.",
          points: [
            { label: "Merer's Crew", metric: "40 Sailors" },
            { label: "Trip Cycle", metric: "2 Days / Load" },
            { label: "Papyrus Date", metric: "Khufu Year 27" },
            { label: "River Distance", metric: "15 km per leg" }
          ]
        },
        tubular_drills: {
          title: "Tubular Drills & Quartz Abrasion",
          subtitle: "Mechanical Machining of Granite & Diorite in Old Kingdom",
          principle: "Shear Abrasion under Continuous Static Load",
          evidence: "Core Samples & Saw Marks by Flinders Petrie",
          desc: "Sir William Flinders Petrie cataloged dozens of granite drill cores in Giza showing regular helical grooves up to 2.5 mm feed rate per turn. Artisans used toothless copper tubes driven by bow drills, with cutting performed by quartz sand grains (7 Mohs) or emery powder in oil.",
          points: [
            { label: "Quartz Hardness", metric: "7 Mohs" },
            { label: "Helical Pitch", metric: "2.5 mm / turn" },
            { label: "Tube Material", metric: "Arsenical Copper" },
            { label: "Linear Speed", metric: "Assisted Friction" }
          ]
        },
        internal_ramp: {
          title: "Internal Spiral Ramp Theory",
          subtitle: "Architectural Model by Jean-Pierre Houdin & ScanPyramids",
          principle: "Mechanical Advantage with Constant 7% Slope (4°)",
          evidence: "EDF Microgravimetry (1986) & FLIR Thermal Imaging (2015)",
          desc: "A linear external ramp to Great Pyramid summit would require 3 million cubic meters of material — more than the pyramid itself. Jean-Pierre Houdin proposed an external ramp built the first 43 meters, while 70% of volume was placed via an internal spiral ramp with open corners for lever turning.",
          points: [
            { label: "Ramp Incline", metric: "7% (4 degrees)" },
            { label: "Saved Material", metric: "≈ 80% vs External" },
            { label: "Internal Spiral", metric: "Embedded at 10-15m" },
            { label: "Thermal Proof", metric: "FLIR Cameras (2015)" }
          ]
        }
      }
    },
    footer: {
      quotePetrie: "“The accuracy of the Great Pyramid is comparable to a fine watchmaker's work, but on a scale of acres of multi-ton stone blocks.”",
      authorPetrie: "Sir William Flinders Petrie (1883)",
      subPetrie: "• Father of Scientific Archaeology",
      quoteChampollion: "“I am entirely Egypt's, and it is everything to me... I deciphered the alphabet of gods and men of Earth's first civilization.”",
      authorChampollion: "Jean-François Champollion (1822)",
      subChampollion: "• Decipherer of Rosetta Stone",
      timelineTitle: "Chronological Timelines of Nile Civilization",
      brandDesc: "Diffusion initiative for archaeoastronomy, hieroglyphic epigraphy, and megalithic engineering grounded in geophysics, laser scans, and century-old excavation records.",
      dossiersTitle: "Thematic Dossiers",
      museumsTitle: "Museums & Collections",
      copyright: "EGYPTIAN CODES • DEDICATED TO THE MEMORY OF NILE SCRIBES AND MASTER BUILDERS.",
      preservation: "HISTORIC HERITAGE PRESERVATION",
      whatsappTooltip: "Contact Us",
    }
  },
  es: {
    nav: {
      solutions: "Soluciones",
      documentary: "Documental",
      resources: "Recursos",
      about: "Sobre",
      store: "Tienda",
      login: "Iniciar sesión",
      getStarted: "Empieza ahora",
    },
    hero: {
      kicker: "Descifrando los",
      headline1: "Códigos",
      headline2: "Egipcios",
      subtitle: "Un viaje por los misterios, símbolos y conocimientos que atravesaron milenios.",
      exploreBtn: "Explorar documental",
      trailerBtn: "Ver tráiler",
      feature1: "Historia Real",
      feature2: "Símbolos Antiguos",
      feature3: "Conocimiento Secreto",
      feature4: "Un Legado Mundial",
    },
    carousel: {
      tag: "Reconocimiento e Investigación de Eruditos",
      title: "Inspirado Por Las Mayores Instituciones Del Mundo",
    },
    bento: {
      card1Title: "Descifrado Instantáneo de Jeroglíficos",
      card1Tag: "ACCESO IMMEDIATO",
      card1Desc: "Archivo 4K HDR • Escaneo 3D",
      card2Tag: "CÓDIGO EGIPCIO • IA CÓSMICA",
      card2Title: "EL PORTAL CÓSMICO DE LA ANTIGUA SABIDURÍA",
      card3Title: "Visión Espectral",
      card3Sub: "Lidar 3D Activo",
      card4Number: "25M",
      card4Label: "inscripciones catalogadas",
      card5Title: "Archivos Sagrados",
      card5Desc: "Papiros reales y modelos 3D listos para análisis fotogramétrico.",
      card5Badge1: "100% Inédito",
      card5Badge2: "• Transliterar",
      card6Btn: "+ EXPLORAR ARCHIVO",
      card6ActiveCount: "12K",
      card6ActiveLabel: "INVESTIGADORES ACTIVOS",
      cartographyTitle: "Cartografía Estelar",
      cartographyDesc: "Mapeo 3D de la correlación milenaria entre los monumentos de Guiza y el cinturón de Orión.",
      epigraphicTitle: "Motor Epigráfico",
      epigraphicDesc: "Transliteración neural instantánea de jeroglíficos sellados en cámaras subterráneas.",
    },
    storeSection: {
      tag: "Colección Oficial & Cursos",
      title: "Tienda de Artefactos & Clases Magistrales",
      subtitle: "Viste la sabiduría milenaria del Nilo y domina la egiptología y arqueoastronomía con nuestros cursos exclusivos y productos premium.",
      filterAll: "Todos los Artículos",
      filterCourses: "Cursos & Masterclasses",
      filterApparel: "Ropa Premium",
      filterAccessories: "Accesorios & Tazas",
      buyBtn: "Obtener Ahora",
      badgeNew: "Exclusivo",
      items: [
        {
          id: "course-master",
          title: "Masterclass: Epigrafía & Lectura de Jeroglíficos",
          category: "courses",
          price: "$ 39",
          desc: "Curso completo online de básico a avanzado con certificado digital de finalización y material didáctico.",
          tag: "Curso Online • 40h",
          rating: "4.9 ★★★★★",
        },
        {
          id: "hoodie-eye",
          title: "Sudadera Oversized Ojo de Horus (Wedjat)",
          category: "apparel",
          price: "$ 59",
          desc: "100% algodón peinado supersuave con bordado de alta densidad del símbolo sagrado.",
          tag: "Edición Especial",
          rating: "5.0 ★★★★★",
        },
        {
          id: "tshirt-pyramid",
          title: "Camiseta Tech Cánon de Guiza (φ & π)",
          category: "apparel",
          price: "$ 25",
          desc: "Algodón premium sostenible con estampado en relieve de geometría sagrada y coordenadas.",
          tag: "Algodón Premium",
          rating: "4.8 ★★★★★",
        },
        {
          id: "mug-gold",
          title: "Taza de Cerámica Negra & Sol de Ra",
          category: "accessories",
          price: "$ 18",
          desc: "Cerámica mate de alta calidad con acabado en brillo dorado y emblema Ankh grabado.",
          tag: "Cerámica 350ml",
          rating: "4.9 ★★★★★",
        },
        {
          id: "cap-djed",
          title: "Gorra Snapback Pilar Djed Minimalista",
          category: "accessories",
          price: "$ 22",
          desc: "Ajuste perfecto con cierre regulable y bordado frontal del pilar Djed.",
          tag: "Accesorio Oficial",
          rating: "4.9 ★★★★★",
        },
        {
          id: "course-astronomy",
          title: "Curso: Arqueoastronomía de las Pirámides",
          category: "courses",
          price: "$ 49",
          desc: "Aprende cómo los egipcios mapeaban el cinturón de Orión, la precesión y la alineación astronómica.",
          tag: "Programa Avanzado",
          rating: "5.0 ★★★★★",
        },
      ],
    },
    math: {
      tag: "Tratado Científico II",
      title: "El Cánon Matemático & La Geometría Sagrada",
      subtitle: "Milenios antes de la academia griega, los maestros del Nilo codificaban la geometría terrestre y cósmica mediante cálculos monumentales, astronomía de alta precisión y acústica piezoeléctrica.",
      source: "Fuente",
      canonicalEq: "Eq. Canónica",
      evidenceTitle: "Evidencias Documentadas & Experimentos:",
      tolerance: "TOLERANCIA: ±0.05%",
      sacredMath: "Matemática Sagrada",
      topics: {
        rhind: {
          title: "El Papiro de Rhind & La Cuadratura",
          subtitle: "Problema 50 del escriba Ahmes (c. 1650 a.C.)",
          badge: "1650 a.C. • British Museum EA 10057",
          desc: "Más de mil años antes de Arquímedes, los escribas egipcios dedujeron una de las más refinadas aproximaciones de Pi (π ≈ 3,16049). La regla consistía en restar 1/9 del diámetro de un campo circular y construir un cuadrado con el segmento resultante.",
          details: [
            "Fracciones Unitarias: El cálculo egipcio operava exclusivamente con fracciones de numerador 1 (como 1/2, 1/3, 1/7), requiriendo tablas de descomposición de extrema complejidad.",
            "Triángulo Sagrado 3-4-5: Los estiradores de cuerdas utilizaban nudos equidistantes para producir ángulos rectos perfectos de 90° en cimentaciones astronómicas.",
            "Cálculo de Volumen Troncocónico: El Papiro de Moscú (Problema 14) demuestra la fórmula correcta del tronco de pirámide: V = (h/3)(a² + ab + b²)."
          ],
          source: "Papiro Matemático Rhind, Tebas (Dinastía XV)"
        },
        cubit: {
          title: "El Codo Real (Meh Niswt)",
          subtitle: "La Proporción Áurea (φ) y la Cosmometría",
          badge: "52,36 cm • Patrón de Granito y Basalto",
          desc: "El Codo Real no era una medida arbitraria, sino una fusión entre el ciclo lunar sideral (28 días) y la geometría geodésica terrestre. 52,36 cm es exactamente la diferencia entre π y φ² en metros (π - φ² ≈ 0,5236).",
          details: [
            "Subdivisión de Precisión: El vigésimo octavo dedo se subdividía en hasta 1/16 de dedo, permitiendo tolerancias inferiores a 0,5 mm en juntas de caliza.",
            "Proporción Áurea (φ) en la Gran Pirâmide: La altura de apotema dividida por la mitad de base resulta en 1,6181 — coincidencia casi perfecta con 0,1% de desvío.",
            "Patrones Maestros de Piedra: Las varas de codo se custodiaban en templos; los maestros calibraban sus varas en cada luna llena bajo pena capital."
          ],
          source: "Vara de Codo Real de Maya, Museo del Louvre (Dinastía XVIII)"
        },
        acoustic: {
          title: "Resonancia Acústica & Piezoelectricidad",
          subtitle: "Frecuencia Harmónica de la Cámara del Rey",
          badge: "432 Hz • Granito Rojo de Asuán",
          desc: "Las paredes y el sarcófago monolítico de la Cámara del Rey se esculpieron en granito rosa de Asuán (hasta 55% cristales de cuarzo). Mediciones acústicas registraron resonancias entre 117 Hz y 432 Hz.",
          details: [
            "Cajas Resonadoras Superiores: Sobre la cámara hay 5 capas de vigas monolíticas de granito (50-70 t) separadas por cámaras de descompresión huecas.",
            "Sarcófago Mecanizado por Resonancia: Marcas de corte helicoidal a 2,5 mm por vuelta sugieren perforación asistida por ultrasonidos abrasivos.",
            "Sensación Psicoacústica: Investigadores documentaron que la vibración continua altera estados cerebrales humanos hacia alfa (8-12 Hz) y teta (4-7 Hz)."
          ],
          source: "Mediciones Acústicas por Flinders Petrie & Dr. Joseph Davidovits"
        }
      }
    },
    necropolis: {
      tag: "Atlas Arqueológico",
      title: "Topografía de las Grandes Necrópolis",
      subtitle: "Navegue por los mayores sitios sagrados del Nilo mediante datos geofísicos, muografía de partículas cósmicas y excavaciones arqueológicas.",
      anomaliesTitle: "Descubrimientos Tomográficos & Registros Estructurales:",
      excavationRecord: "Registro de Excavación",
      academicDoc: "DOC ACADÉMICO",
      keyDiscoveryTag: "Hito Arqueológico Principal",
      georefCoords: "COORDENADAS GEOREFERENCIADAS",
      satellite: "Datum WGS84 • Satélite Sentinel-2",
      sites: {
        giza: {
          name: "Meseta de Guiza",
          location: "Bajo Egipto • Margen Oeste del Nilo",
          dynasty: "IV Dinastía (c. 2589–2504 a.C.)",
          age: "4.500+ Años",
          keyDiscovery: "Muografía Cósmica ScanPyramids (2017–2023)",
          desc: "La meseta kárstica de Guiza alberga a Jufu (Queops), Jafra (Kefren) y Menkaura (Micerino). Las cuatro caras están alineadas a los puntos cardinales con un desvío medio de solo 0,05°.",
          anomalies: [
            "El 'Gran Vacío' de 30 Metros: Detectado por muografía de muones cósmicos, un vacío oculto de más de 30 metros flota exactamente sobre la Gran Galería.",
            "Corredor Oculto de la Cara Norte: En marzo de 2023, un endoscopio óptico confirmó un corredor en caballete de 9 m de largo y 2 m de ancho.",
            "Conexión con el Agua Subterránea: A 30 metros bajo la Esfinge, el Pozo de Osiris alberga tres niveles de cámaras inundadas conectadas al acuífero."
          ],
          data: [
            { label: "Masa Total Estimada", value: "6.000.000 t" },
            { label: "Bloques de Caliza", value: "≈ 2.300.000" },
            { label: "Precisión del Norte", value: "3' 6\" de arco" },
            { label: "Desnivel de la Base", value: "< 1.5 cm" }
          ]
        },
        saqqara: {
          name: "Complejo de Saqqara",
          location: "Menfis • Meseta Desértica",
          dynasty: "III Dinastía (c. 2670–2650 a.C.)",
          age: "4.700+ Años",
          keyDiscovery: "El Laberinto Subterráneo de Imhotep",
          desc: "La Pirâmide Escalonada de Djoser marca el origen de la arquitectura monumental en piedra tallada en la Tierra, ideada por Imhotep. Debajo se extiende una ciudad subterránea.",
          anomalies: [
            "5,7 km de Galerías Subterráneas: Red de túneles, pozos verticales de 28 m y cámaras revestidas con 36.000 azulejos de fayenza turquesa.",
            "Colección de 40.000 Vasos Predinásticos: Vasos tallados en diorita, basalto y esquisto de extrema dureza con paredes milimétricas.",
            "Serapeum de Saqqara: Catacumbas con 24 sarcófagos monolíticos de granito negro y diorita de 70 a 100 toneladas con planitud óptica."
          ],
          data: [
            { label: "Extensión de Túneles", value: "5.700 metros" },
            { label: "Escalones Monumentales", value: "6 Niveles" },
            { label: "Vasos Recuperados", value: "+40.000 piezas" },
            { label: "Peso de Sarcófagos", value: "70 a 100 t" }
          ]
        },
        kings_valley: {
          name: "Valle de los Reyes",
          location: "Tebas Occidental • Luxor",
          dynasty: "Dinastías XVIII a XX (c. 1550–1077 a.C.)",
          age: "3.500+ Años",
          keyDiscovery: "Textos Herméticos del Más Allá",
          desc: "El cementerio sagrado de los faraones del Imperio Nuevo tallado en el cañón de caliza bajo la montaña piramidal al-Qurn. Cada tumba es un libro cosmológico 3D.",
          anomalies: [
            "Tumba KV17 (Seti I): La más profunda (137 m), pintada con el 'Amduat' y el 'Libro de las Puertas' con pigmentos intactos tras 3.300 años.",
            "Química del Azul Egipcio: Primer pigmento sintético (CaCuSi₄O₁₀), con emisión de radiación infrarroja cercana (NIR) de alto rendimiento.",
            "KV62 (Tutankamón): Descubierta intacta por Howard Carter en 1922 con 5.398 artefactos de oro y una daga forjada en hierro meteorítico."
          ],
          data: [
            { label: "Tumbas Catalogadas", value: "65 KV" },
            { label: "Profundidad Máx. (KV17)", value: "137 metros" },
            { label: "Artefactos en KV62", value: "5.398 ítems" },
            { label: "Material de la Daga", value: "Hierro Meteorítico" }
          ]
        },
        abydos: {
          name: "Abidos & Dendera",
          location: "Medio y Alto Egipto",
          dynasty: "I Dinastía al Período Ptolemaico",
          age: "5.000+ Años",
          keyDiscovery: "El Osireion Megalítico & El Zodíaco Celestial",
          desc: "Abidos fue el epicentro del culto a Osiris. Detrás del templo de Seti I yace el enigmático Osireion construido con megaliítos de granito de 100 toneladas.",
          anomalies: [
            "Megalitismo del Osireion: Bloques ciclópeos sin mortero sumergidos en agua freática permanente, atribuidos a épocas predinásticas.",
            "Zodíaco de Dendera: Relieve celeste en el techo de Hathor que registra la precesión de equinoxios y la constelación de Orión (en el Louvre).",
            "Lista Real de Abidos: Registro genealógico canónico de 76 faraones que preservó la cronología dinástica."
          ],
          data: [
            { label: "Bloques del Osireion", value: "Hasta 100 t" },
            { label: "Reyes Catalogados", value: "76 Faraones" },
            { label: "Diámetro del Zodíaco", value: "2.55 metros" },
            { label: "Nivel Freático", value: "Tabla Permanente" }
          ]
        }
      }
    },
    lexicon: {
      tag: "Semiótica & Epigrafía",
      title: "Léxico Sagrado: La Ciencia de los Símbolos",
      subtitle: "Cada glifo esculpido en piedra no era solo una letra, sino un compendio de matemática fracionaria, biología y metafísica aplicada.",
      decompositionTitle: "Descomposición Analítica de Componentes:",
      symbols: {
        wedjat: {
          name: "El Ojo de Horus",
          meaning: "La Métrica Médica Fraccionaria & El Ojo de la Percepción",
          insight: "Lejos de ser un mero adorno místico, el Ojo de Horus constituía la base del sistema métrico farmacéutico. Las seis partes representaban fracciones binarias de medidas Heqat asociadas a sentidos humanos.",
          quote: "La suma de las seis fracciones totaliza 63/64. El 1/64 faltante es la fracción divina restituida por Thot, inventor de la escritura.",
          attrs: [
            { symbolPart: "Esquina Interior", meaning: "Olfato (Sentido del Aroma Sagrado)", ratio: "1/2 (0.500)" },
            { symbolPart: "Pupila Central", meaning: "Visión (Percepción Luminosa)", ratio: "1/4 (0.250)" },
            { symbolPart: "Cejas Curvas", meaning: "Intelecto / Pensamiento Racional", ratio: "1/8 (0.125)" },
            { symbolPart: "Esquina Exterior", meaning: "Audición (Escucha de Armonía)", ratio: "1/16 (0.0625)" },
            { symbolPart: "Trazo Espiral Inferior", meaning: "Gusto (Brote del Grano)", ratio: "1/32 (0.03125)" },
            { symbolPart: "Trazo Vertical Recto", meaning: "Tacto (Tacto Físico en la Tierra)", ratio: "1/64 (0.015625)" }
          ]
        },
        ankh: {
          name: "La Llave de la Vida",
          meaning: "La Fusión de Polaridades & La Respiración Cósmica",
          insight: "El Ankh representa la síntesis biológica y cosmológica de la vida. El asa ovalada simboliza el principio femenino; el eje vertical representa la emanación masculina; la barra horizontal marca el horizonte Akhet.",
          quote: "'Te concedo toda la vida, estabilidad y dominio, toda la salud y alegría como la de Ra, eternamente.' — Templo de Karnak",
          attrs: [
            { symbolPart: "Asa Ovalada Superior", meaning: "Circuito Cerrado / Cielo Infinito", ratio: "Eternidad (Djet)" },
            { symbolPart: "Barra Horizontal", meaning: "El Horizonte Divino / Transición", ratio: "Equilíbrio (Ma'at)" },
            { symbolPart: "Tallo Vertical", meaning: "Conductor Telúrico / Eje Terrestre", ratio: "Fundação (Ptah)" },
            { symbolPart: "Ritual Respiratório", meaning: "Colocado en la nariz de los reyes para infundir el aliento Ka", ratio: "Fuerza Vital" }
          ]
        },
        djed: {
          name: "El Pilar Djed",
          meaning: "La Columna de Osiris & La Estabilidade Tectónica",
          insight: "Uno de los jeroglíficos más antiguos, el Djed representa la columna vertebral de Osiris restaurada. Sus cuatro anillos superpuestos inspiran comparaciones con aisladores dieléctricos modernos.",
          quote: "'¡Levántate, oh Osiris! Tienes tu columna de vuelta. ¡Tus vértebras están ajustadas!' — Textos de las Pirámides",
          attrs: [
            { symbolPart: "Cuatro Anillos", meaning: "4 Vértebras Cervicales / Cuatro Pilares", ratio: "Tetráfora" },
            { symbolPart: "Fuste Monolítico", meaning: "Tronco de Cedro que encerró a Osiris", ratio: "Eje Cósmico" },
            { symbolPart: "Fiesta de Sed", meaning: "Ceremonia de 'Erguir el Djed' para renovar el vigor", ratio: "Año Jubilar" },
            { symbolPart: "Amuleto Protector", meaning: "Colocado sobre la columna de la momia", ratio: "Capítulo 155" }
          ]
        },
        khepri: {
          name: "El Escarabajo Sagrado",
          meaning: "Astrobiología & La Metamorfosis Solar",
          insight: "En 2013, biólogos comprobaron que el Scarabaeus sacer navega orientándose por la Vía Láctea. Los egipcios ya habían observado este vínculo astronómico hace 4.000 años.",
          quote: "'¡Oh corazón de mi madre! ¡No te levantes como testigo en mi contra ante el tribunal!' — Escarabajos de Corazón",
          attrs: [
            { symbolPart: "Esfera de Estiércol", meaning: "El Disco Solar (Aten) rodado por el cosmos", ratio: "Translación Solar" },
            { symbolPart: "Ciclo Subterrâneo", meaning: "Huevos enterrados que eclosionan en nueva vida", ratio: "Resurrección" },
            { symbolPart: "Escarabajo de Corazón", meaning: "Amuleto verde sobre el tórax de la momia", ratio: "Capítulo 30B" },
            { symbolPart: "Navegación Estelar", meaning: "Orientación probada por la Vía Láctea", ratio: "Astro-Navegación" }
          ]
        }
      }
    },
    eng: {
      tag: "Mecânica & Arquitectura",
      title: "Crónicas de Ingeniería: ¿Cómo Se Construyó?",
      subtitle: "La desmitificación de las mayores hazañas estructurales mediante evidencias arqueológicas, diarios de obreros y física de materiales.",
      tagStudy: "Estudio de Ingeniería",
      primaryEvidence: "Evidencia Primaria Arqueológica:",
      paramsTitle: "Parámetros Físicos y Mecánicos:",
      empiricValidation: "Validación empírica reproducible en laboratorio moderno",
      studies: {
        sand_friction: {
          title: "La Física de la Arena Húmeda",
          subtitle: "Validación Experimental de la Univ. de Ámsterdam (2014)",
          principle: "Puentes Capilares & Coeficiente de Fricción μ reducido en 50%",
          evidence: "Pintura mural en tumba de Djehutihotep, El-Bersha (c. 1880 a.C.)",
          desc: "Durante décadas se creyó que vertían líquido por ritual. En 2014, el físico Dr. Daniel Bonn demostró que la humedad exacta (2%-5% agua) forma micropuentes capilares que reducen la fuerza de tracción a la mitad.",
          points: [
            { label: "Masa de la Estatua", metric: "58 Toneladas" },
            { label: "Reducción de Arrastre", metric: "-50% Fricción" },
            { label: "Fuerza por Obrero", metric: "≈ 35 kgf / hombre" },
            { label: "Humedad Crítica", metric: "2% a 5% H₂O" }
          ]
        },
        merer_papyrus: {
          title: "El Diario de Merer & Los Canales del Nilo",
          subtitle: "Registro Escrito Más Antiguo de un Constructor (c. 2560 a.C.)",
          principle: "Empuje Hidrostático en la Estación Akhet",
          evidence: "Papiros de Wadi al-Jarf, Mar Rojo (Descubiertos en 2013)",
          desc: "Descubierto por Pierre Tallet, el diario del inspector Merer describe la logística de transporte de bloques de caliza de Tura hacia la meseta de Guiza en barcazas por canales inundados por la crecida del Nilo.",
          points: [
            { label: "Equipo de Merer", metric: "40 Marineros" },
            { label: "Ciclo de Viaje", metric: "2 Días / Carga" },
            { label: "Fecha del Papiro", metric: "Año 27 de Jufu" },
            { label: "Distancia Fluvial", metric: "15 km por tramo" }
          ]
        },
        tubular_drills: {
          title: "Brocas Tubulares & Abrasión por Cuarzo",
          subtitle: "Mecanizado de Granito y Diorita en el Reino Antiguo",
          principle: "Abrasión por Cizallamiento bajo Carga Estática",
          evidence: "Muestras de Perforación & Marcas de Sierra por Flinders Petrie",
          desc: "Flinders Petrie catalogó núcleos de perforación en granito con surcos helicoidales regulares de hasta 2,5 mm por vuelta. Usaban tubos de cobre impulsados por arcos con arena de cuarzo en aceite.",
          points: [
            { label: "Dureza del Cuarzo", metric: "7 Mohs" },
            { label: "Paso Helicoidal", metric: "2.5 mm / vuelta" },
            { label: "Material del Tubo", metric: "Cobre Arsenical" },
            { label: "Velocidad Lineal", metric: "Fricción Asistida" }
          ]
        },
        internal_ramp: {
          title: "Teoría de la Rampa Interna en Espiral",
          subtitle: "Modelo Arquitectónico de Jean-Pierre Houdin & ScanPyramids",
          principle: "Ventaja Mecánica con Inclinación Constante del 7% (4°)",
          evidence: "Microgravimetría EDF (1986) & Termografía FLIR (2015)",
          desc: "Una rampa externa requeriría 3 millones de m³ de material. Jean-Pierre Houdin propuso que una rampa externa elevó los primeros 43 m, mientras el 70% restante se colocó mediante una rampa en espiral interna.",
          points: [
            { label: "Inclinación de Rampa", metric: "7% (4 grados)" },
            { label: "Material Ahorrado", metric: "≈ 80% vs Externa" },
            { label: "Espiral Interna", metric: "Embebida a 10-15m" },
            { label: "Prueba Térmica", metric: "Cámaras FLIR (2015)" }
          ]
        }
      }
    },
    footer: {
      quotePetrie: "“La exactitud de la Gran Pirámide puede compararse al trabajo de un relojero de precisión, pero en acres de bloques de muchas toneladas.”",
      authorPetrie: "Sir William Flinders Petrie (1883)",
      subPetrie: "• Padre de la Arqueología Científica",
      quoteChampollion: "“Soy enteramente del Egipto, y él lo es todo para mí... descifré el alfabeto de los dioses y hombres de la primera grande civilización.”",
      authorChampollion: "Jean-François Champollion (1822)",
      subChampollion: "• Descifrador de la Piedra de Rosetta",
      timelineTitle: "Ejes Cronológicos de la Civilización del Nilo",
      brandDesc: "Iniciativa de difusión de arqueoastronomía, epigrafía y megalitismo basada en geofísica, escáneres láser y registros de excavación.",
      dossiersTitle: "Dossieres Temáticos",
      museumsTitle: "Colecciones & Museos",
      copyright: "CÓDIGOS EGIPCIOS • DEDICADO A LA MEMORIA DE LOS ESCRIBAS Y MAESTROS CONSTRUCTORES DEL NILO.",
      preservation: "PRESERVACIÓN DEL PATRIMONIO HISTÓRICO",
      whatsappTooltip: "Habla con nosotros",
    }
  }
};
