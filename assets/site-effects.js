(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header");

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const createMeasureQuiz = () => {
    if (document.querySelector("[data-measure-quiz]")) return;

    const modal = document.createElement("div");
    modal.className = "measure-quiz";
    modal.setAttribute("data-measure-quiz", "");
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="measure-quiz-backdrop" data-measure-quiz-close></div>
      <section class="measure-quiz-panel" role="dialog" aria-modal="true" aria-labelledby="measure-quiz-title" tabindex="-1">
        <button class="measure-quiz-close" type="button" data-measure-quiz-close aria-label="Закрыть предложение"></button>
        <div class="measure-quiz-visual">
          <img src="./assets/free-zamer.png" alt="Рулетка для бесплатного замера" />
          <span>бесплатный выезд</span>
        </div>
        <div class="measure-quiz-content">
          <span class="measure-quiz-kicker">постоянная акция</span>
          <h2 id="measure-quiz-title">Бесплатный замер участка</h2>
          <p>
            Подберем тип забора, ворот или навеса, оценим участок и подскажем
            оптимальное решение под ваш бюджет.
          </p>
          <div class="measure-quiz-note">
            <strong>Свяжитесь с нами как удобно</strong>
            <span>без заявки и ожидания обратного звонка</span>
          </div>
          <div class="measure-quiz-actions" aria-label="Способы связи">
            <a class="measure-quiz-action measure-quiz-action-phone" href="tel:+79013811181" data-measure-quiz-contact>
              <span class="measure-quiz-phone-icon" aria-hidden="true"></span>
              <span>
                <strong>Связаться с нами</strong>
              </span>
            </a>
            <a class="measure-quiz-action" href="https://web.max.ru/" target="_blank" rel="noopener" data-measure-quiz-contact>
              <img src="./assets/max-logo.webp" alt="" />
              <span>
                <strong>Написать в Max</strong>
              </span>
            </a>
            <a class="measure-quiz-action" href="tg://resolve?phone=79969668691" data-measure-quiz-contact>
              <img src="./assets/telegram-logo.webp" alt="" />
              <span>
                <strong>Написать в Telegram</strong>
              </span>
            </a>
          </div>
        </div>
      </section>
    `;
    document.body.append(modal);

    const panel = modal.querySelector(".measure-quiz-panel");
    let quizScrollY = 0;

    const closeQuiz = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-measure-quiz-open");
      document.body.style.top = "";
      window.scrollTo(0, quizScrollY);
    };

    const openQuiz = () => {
      if (sessionStorage.getItem("measureQuizSeen") === "true") return;
      if (document.body.classList.contains("is-fence-modal-open")) {
        window.setTimeout(openQuiz, 5000);
        return;
      }
      quizScrollY = window.scrollY;
      sessionStorage.setItem("measureQuizSeen", "true");
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-measure-quiz-open");
      document.body.style.top = `-${quizScrollY}px`;
      panel.focus({ preventScroll: true });
    };

    modal.querySelectorAll("[data-measure-quiz-close], [data-measure-quiz-contact]").forEach(control => {
      control.addEventListener("click", closeQuiz);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) closeQuiz();
    });

    window.setTimeout(openQuiz, 20000);
  };

  createMeasureQuiz();

  const fenceDetails = {
    picket: {
      kicker: "металлический штакетник",
      title: "Металлический штакетник",
      tag: "открытый фасад участка",
      image: "./assets/fence-gallery/picket-01.jpg",
      imageAlt: "Забор из металлического штакетника",
      gallery: [
        { src: "./assets/fence-piles-profile-or-picket.png", alt: "Забор из металлического штакетника" },
        { src: "./assets/fence-gallery/picket-01.jpg", alt: "Металлический штакетник на участке" },
        { src: "./assets/fence-gallery/picket-02.jpg", alt: "Коричневый забор из металлического штакетника" },
        { src: "./assets/fence-gallery/picket-03.jpg", alt: "Металлический штакетник с воротами" }
      ],
      lead: "Аккуратный металлический забор для участков, где важны свет, продуваемость и визуально легкая линия.",
      text: "Штакетник собирается из отдельных планок на металлическом каркасе. Можно выбрать одностороннюю установку с зазором или шахматку, когда обзор перекрывается сильнее, но участок остается проветриваемым. Хорошо подходит для фасадной стороны дома, дачи и длинных периметров.",
      specs: [
        ["Высота", "≈ 1,5-2,2 м"],
        ["Зазор", "≈ 2-5 см"],
        ["Покрытие", "полимер / порошковая окраска"],
        ["Приватность", "средняя или высокая в шахматке"]
      ],
      points: [
        "Не создает глухой парусности и спокойнее ведет себя на ветреных участках.",
        "Можно подобрать цвет, форму верхнего края и плотность зазора.",
        "Шахматная схема делает забор более приватным без ощущения сплошной стены."
      ],
      included: [
        "Разметка линии, бурение лунок и установка столбов.",
        "Монтаж горизонтальных лаг, штакетин, планок и крепежа.",
        "Подготовка ворот и калитки в едином стиле при необходимости."
      ]
    },
    profile: {
      kicker: "профнастил",
      title: "Забор из профнастила",
      tag: "максимум приватности",
      image: "./assets/fence-brown.webp",
      imageAlt: "Забор из профнастила с воротами и калиткой",
      gallery: [
        { src: "./assets/fence-profile-gate-wicket.png", alt: "Забор из профнастила с воротами и калиткой" },
        { src: "./assets/fence-profile-brick-posts.png", alt: "Забор из профнастила с кирпичными столбами" },
        { src: "./assets/long-fence.webp", alt: "Длинная линия металлического забора" }
      ],
      lead: "Практичный глухой забор для тех, кому нужно быстро закрыть участок от обзора и получить понятную смету.",
      text: "Профлист крепится к металлическим лагам на столбах и хорошо перекрывает вид с улицы. Для частных домов и дач чаще выбирают высоту 1,8-2 м, профиль C8 или C20, одно- или двустороннее полимерное покрытие. Верх можно закрыть П-образной планкой, а каркас дополнительно покрасить.",
      specs: [
        ["Высота", "1,5-2,5 м"],
        ["Профиль", "C8 / C20"],
        ["Толщина", "часто 0,4-0,5 мм"],
        ["Приватность", "высокая"]
      ],
      points: [
        "Хороший выбор для периметра, где важны приватность и скорость монтажа.",
        "Бюджет легко считать по погонным метрам, воротам, калиткам и количеству лаг.",
        "Подходит для комбинирования: фасад можно сделать более декоративным, а боковые стороны практичнее."
      ],
      included: [
        "Замер, подбор высоты, профиля листа и количества горизонталей.",
        "Установка столбов с бутированием или бетонированием по грунту.",
        "Монтаж листов, доборных планок, ворот, калитки и сдача готовой линии."
      ]
    },
    louver: {
      kicker: "премиум-секции",
      title: "Заборы-жалюзи",
      tag: "приватность и вентиляция",
      image: "./assets/fence-gallery/louver-01.jpeg",
      imageAlt: "Забор-жалюзи серого цвета",
      gallery: [
        { src: "./assets/fence-louver-gray.jpeg", alt: "Серый забор-жалюзи" },
        { src: "./assets/fence-louver-brown.jpeg", alt: "Коричневый забор-жалюзи" },
        { src: "./assets/fence-gallery/louver-01.jpeg", alt: "Забор-жалюзи с декоративным покрытием" }
      ],
      lead: "Современное ограждение с ламелями, которое закрывает прямой обзор, но сохраняет движение воздуха.",
      text: "Ламели устанавливаются под углом, поэтому забор выглядит монолитно с улицы и при этом не работает как полностью глухая стена. Такое решение часто выбирают для современных домов, фасадной линии участка и зон, где важен аккуратный внешний вид.",
      specs: [
        ["Высота", "1,7-2,4 м"],
        ["Конструкция", "горизонтальные ламели"],
        ["Покрытие", "полимерное / под дерево"],
        ["Класс", "премиум"]
      ],
      points: [
        "Защищает от прямого взгляда, оставляя участок проветриваемым.",
        "Лучше смотрится на архитектурных фасадах, чем обычный технический забор.",
        "Можно сочетать с откатными воротами, калиткой и декоративными столбами."
      ],
      included: [
        "Расчет секций по проемам и уклону участка.",
        "Монтаж несущего каркаса и ламелей с точной геометрией.",
        "Подбор цвета, покрытия и комплектующих под дом."
      ]
    },
    ranch: {
      kicker: "ранчо",
      title: "Забор ранчо",
      tag: "легкая горизонталь",
      image: "./assets/fence-rancho.jpg",
      imageAlt: "Горизонтальный забор ранчо",
      gallery: [
        { src: "./assets/fence-rancho.jpg", alt: "Забор ранчо" },
        { src: "./assets/fence-gallery/ranch-02-custom.jpg", alt: "Современный забор ранчо у частного дома" }
      ],
      lead: "Открытый горизонтальный забор для обозначения границ, сада, фасадной зоны или участка в загородном стиле.",
      text: "Ранчо не закрывает участок полностью, зато делает периметр визуально легким и дружелюбным. Его выбирают там, где важнее архитектурная линия и зонирование, чем полная приватность. В металле такой забор долговечнее деревянного и проще в уходе.",
      specs: [
        ["Высота", "≈ 1,2-1,8 м"],
        ["Заполнение", "горизонтальные планки"],
        ["Приватность", "низкая"],
        ["Назначение", "фасад / сад / зоны"]
      ],
      points: [
        "Хорошо подчеркивает ландшафт и не перекрывает обзор.",
        "Подходит для палисадников, внутренних зон и открытых фасадов.",
        "Можно сделать в цвете дома, ворот или кровли."
      ],
      included: [
        "Разметка открытых линий и подбор шага столбов.",
        "Монтаж металлических столбов и горизонтального заполнения.",
        "Согласование высоты, количества рядов и цвета покрытия."
      ]
    },
    chainlink: {
      kicker: "сетка рабица",
      title: "Забор из сетки рабицы",
      tag: "экономичный периметр",
      image: "./assets/fence-gallery/chainlink-01.jpg",
      imageAlt: "Забор из сетки рабицы",
      gallery: [
        { src: "./assets/fence-chainlink.jpeg", alt: "Забор из сетки рабицы" },
        { src: "./assets/fence-gallery/chainlink-01.jpg", alt: "Забор из сетки рабицы вдоль участка" },
        { src: "./assets/fence-gallery/chainlink-03.jpg", alt: "Забор из сетки для дачного участка" }
      ],
      lead: "Самый простой способ обозначить границы участка, закрыть хозяйственную зону или поставить недорогой дачный периметр.",
      text: "Рабица остается открытой для света и воздуха, поэтому ее часто ставят на дачах, между соседними участками и на временных или технических линиях. Конструкция может быть без протяжек, с одной или двумя протяжками, а также в секционном исполнении.",
      specs: [
        ["Высота", "1,5-2 м"],
        ["Вариант", "рулонная / секционная"],
        ["Протяжки", "0-2 линии"],
        ["Бюджет", "самый доступный"]
      ],
      points: [
        "Быстро монтируется и не затеняет посадки.",
        "Подходит для длинного периметра, где важна экономия.",
        "Секционный формат выглядит аккуратнее и лучше держит геометрию."
      ],
      included: [
        "Установка столбов с выбранным типом закрепления в грунте.",
        "Натяжка сетки или монтаж готовых секций.",
        "Установка ворот и калитки для технического въезда при необходимости."
      ]
    },
    combined: {
      kicker: "индивидуальный проект",
      title: "Комбинированный забор",
      tag: "металл, кирпич и декоративные покрытия",
      image: "./assets/fence-gallery/combined-01.jpg",
      imageAlt: "Комбинированный забор с кирпичными столбами",
      gallery: [
        { src: "./assets/fence-profile-brick-posts.png", alt: "Комбинированный забор с кирпичными столбами" },
        { src: "./assets/fence-gallery/combined-01.jpg", alt: "Комбинированный забор с кирпичными столбами" },
        { src: "./assets/fence-gallery/combined-03.jpg", alt: "Комбинированный забор с воротами" }
      ],
      lead: "Решение под архитектуру дома: металлическое заполнение, кирпичные или усиленные столбы, декоративные покрытия и ворота в одном стиле.",
      text: "Комбинированный забор собирается под конкретный участок: можно сделать глухое заполнение из профнастила, более легкий штакетник, жалюзи или секции, а несущую часть усилить кирпичными столбами и фундаментом. Такой вариант чаще выбирают для фасада и въездной группы.",
      specs: [
        ["Основа", "металлический каркас"],
        ["Столбы", "металл / кирпич"],
        ["Фундамент", "точечный или ленточный"],
        ["Смета", "по проекту"]
      ],
      points: [
        "Можно связать забор с фасадом, кровлей, воротами и навесом.",
        "Подходит для сложного рельефа и участков с выразительной въездной группой.",
        "Позволяет совместить приватные и открытые зоны в одном периметре."
      ],
      included: [
        "Выезд на объект, замер перепадов и расчет нагрузок.",
        "Подбор заполнения, столбов, фундамента, ворот и калитки.",
        "Монтаж под ключ с единой сметой и согласованием узлов."
      ]
    },
    "gate-sliding": {
      kicker: "откатные ворота",
      title: "Откатные ворота",
      tag: "комфортный въезд без распахивания",
      image: "./assets/gates-gallery/sliding-proftruba.jpg",
      imageAlt: "Откатные ворота из профильной трубы",
      gallery: [
        { src: "./assets/gates-gallery/sliding-proftruba.jpg", alt: "Откатные ворота из профильной трубы" },
        { src: "./assets/gates-gallery/sliding-proflist.jpg", alt: "Откатные ворота с заполнением профлистом" },
        { src: "./assets/gates-gallery/sliding-picket.jpg", alt: "Откатные ворота с металлическим штакетником" }
      ],
      lead: "Полотно сдвигается вдоль линии забора и не занимает место перед въездом.",
      text: "Откатные ворота подходят для частных домов, дач и коттеджей, где важно удобно заезжать зимой и не чистить зону распахивания створок. Конструкцию изготавливаем под ширину проема, подбираем заполнение под забор и заранее закладываем место под автоматику.",
      specs: [
        ["Проем", "3-6 м"],
        ["Высота", "1,8-2,5 м"],
        ["Откат", "≈ 1,5 ширины проема"],
        ["Опции", "автоматика / калитка"]
      ],
      points: [
        "Хороши для участков, где перед въездом мало свободного пространства.",
        "Можно заполнить профлистом, штакетником, ламелями, профильной трубой или секциями в стиле забора.",
        "Для стабильной работы важны закладная, роликовые опоры и точная геометрия полотна."
      ],
      included: [
        "Замер проема, проверка места под откат и подбор комплекта роликов.",
        "Изготовление рамы, установка направляющей балки, улавливателей и поддерживающих роликов.",
        "Монтаж на подготовленное основание, регулировка хода и подготовка под привод."
      ]
    },
    "gate-swing": {
      kicker: "распашные ворота",
      title: "Распашные ворота",
      tag: "простая и надежная классика",
      image: "./assets/gates-gallery/swing-proftruba.jpg",
      imageAlt: "Распашные ворота из профильной трубы",
      gallery: [
        { src: "./assets/gates-gallery/swing-proftruba.jpg", alt: "Распашные ворота из профильной трубы" },
        { src: "./assets/gates-gallery/swing-picket-house.jpg", alt: "Распашные ворота с вертикальным заполнением у дома" }
      ],
      lead: "Две створки на усиленных петлях открываются внутрь или наружу участка.",
      text: "Распашные ворота выбирают, когда участок позволяет свободно открывать створки. Это понятная, ремонтопригодная конструкция для дачи и частного дома. Створки можно усилить рамой, дополнить стопорами, замком, калиткой и автоматикой.",
      specs: [
        ["Проем", "3-5 м"],
        ["Каркас", "40x20 / 60x40"],
        ["Столбы", "80x80 / 100x100"],
        ["Петли", "усиленные"]
      ],
      points: [
        "Бюджетнее откатных при той же ширине проема.",
        "Подходят под профлист, евроштакетник, 3D-сетку, профильную трубу, ковку и жалюзи.",
        "Для широких и тяжелых створок лучше использовать усиленную раму и более мощные столбы."
      ],
      included: [
        "Разметка проема и установка опорных столбов по уровню.",
        "Изготовление створок, приварка петель, монтаж стопоров и запорной фурнитуры.",
        "Регулировка зазоров, проверка открывания и подготовка под автоматику при необходимости."
      ]
    },
    "gate-wicket": {
      kicker: "ворота с калиткой",
      title: "Ворота с калиткой",
      tag: "единый входной блок",
      image: "./assets/fence-profile-gate-wicket.png",
      imageAlt: "Ворота и калитка в одном стиле с забором",
      gallery: [
        { src: "./assets/fence-profile-gate-wicket.png", alt: "Ворота и калитка из профнастила" },
        { src: "./assets/gates-project-orion-stitch.webp", alt: "Современная въездная группа с воротами" },
        { src: "./assets/gates-gallery/sliding-picket.jpg", alt: "Ворота и калитка из металлического штакетника" }
      ],
      lead: "Калитку можно встроить в полотно ворот или поставить рядом отдельным элементом.",
      text: "Такой формат экономит место и помогает собрать въездную группу в едином стиле. Для встроенной калитки особенно важна жесткость полотна, правильное расположение перемычек, ручка, замок и доводчик по задаче.",
      specs: [
        ["Калитка", "встроенная / рядом"],
        ["Ширина", "под проем"],
        ["Фурнитура", "замок / ручка"],
        ["Стиль", "как у забора"]
      ],
      points: [
        "Удобно, когда нет места под отдельный пешеходный вход.",
        "Можно повторить заполнение забора: профлист, штакетник, ламели или профильная труба.",
        "На этапе замера важно учесть порожек, направление открывания и высоту замка."
      ],
      included: [
        "Подбор схемы: встроенная калитка или отдельная рядом с воротами.",
        "Изготовление рам, усилений, петель, замка и ответных элементов.",
        "Монтаж, регулировка хода и согласование единой линии с забором."
      ]
    },
    "canopy-metal": {
      kicker: "металлический навес",
      title: "Металлический навес для автомобиля",
      tag: "стальной каркас под размер участка",
      image: "./assets/canopy.webp",
      imageAlt: "Металлический навес для автомобиля",
      gallery: [
        { src: "./assets/canopy.webp", alt: "Металлический навес с профилированной кровлей" },
        { src: "./assets/hero-canopy-evening.jpg", alt: "Навес для нескольких автомобилей у дома" },
        { src: "./assets/portfolio-canopy-blue.jpg", alt: "Двускатный металлический навес" }
      ],
      lead: "Практичная альтернатива гаражу: защищает автомобиль от осадков, солнца, града и листвы.",
      text: "Каркас выполняется из стальной профильной трубы и рассчитывается под размеры парковки. Кровлю можно сделать из профнастила, металлочерепицы или листовой стали, а цвет каркаса подобрать под ворота, забор или фасад дома.",
      specs: [
        ["Каркас", "профильная труба"],
        ["Кровля", "профлист / металлочерепица"],
        ["Опоры", "бетон / анкера"],
        ["Монтаж", "1-2 дня после изготовления"]
      ],
      points: [
        "Защищает кузов и лакокрасочное покрытие от погодных нагрузок.",
        "Занимает меньше места и быстрее монтируется, чем капитальный гараж.",
        "Можно сделать навес на 1 или 2 автомобиля под точные размеры участка."
      ],
      included: [
        "Выезд, замер парковочной зоны и подбор типа конструкции.",
        "Изготовление металлического каркаса с антикоррозийной обработкой.",
        "Монтаж опор, ферм, кровли и водоотвода по необходимости."
      ]
    },
    "canopy-proflist": {
      kicker: "профнастил",
      title: "Навес из профнастила",
      tag: "плотная тень и защита от осадков",
      image: "./assets/portfolio-canopy-blue.jpg",
      imageAlt: "Навес из профнастила у частного дома",
      gallery: [
        { src: "./assets/portfolio-canopy-blue.jpg", alt: "Навес из профнастила у частного дома" },
        { src: "./assets/canopy.webp", alt: "Кровля навеса из профилированного металла" },
        { src: "./assets/hero-canopy-evening.jpg", alt: "Металлический навес вечером" }
      ],
      lead: "Профлист не пропускает осадки и дает плотную тень для автомобиля.",
      text: "Навес из профнастила хорошо сочетается с металлическими заборами, воротами, кровлей дома и хозяйственными постройками. Материал доступен в разных цветах, поэтому конструкцию можно визуально связать с остальной въездной зоной.",
      specs: [
        ["Материал", "оцинкованный профлист"],
        ["Толщина", "≈ 0,4-0,7 мм"],
        ["Уклон", "для схода воды"],
        ["Цвет", "по палитре"]
      ],
      points: [
        "Оптимален, когда нужна тень и закрытая кровля без светопрозрачности.",
        "Подходит для односкатных, двускатных и пристроенных навесов.",
        "Легко подобрать цвет под забор, ворота или кровлю дома."
      ],
      included: [
        "Расчет уклона, шага обрешетки и длины кровельных листов.",
        "Монтаж каркаса, профлиста, планок примыкания и крепежа.",
        "Установка желобов и труб по задаче водоотвода."
      ]
    },
    "canopy-tile": {
      kicker: "металлочерепица",
      title: "Навес из металлочерепицы",
      tag: "единый стиль с кровлей дома",
      image: "./assets/hero-canopy-evening.jpg",
      imageAlt: "Навес из металлочерепицы для автомобилей",
      gallery: [
        { src: "./assets/hero-canopy-evening.jpg", alt: "Навес из металлочерепицы для автомобилей" },
        { src: "./assets/portfolio-canopy-evening.jpg", alt: "Двускатный навес возле частного дома" },
        { src: "./assets/portfolio-canopy-blue.jpg", alt: "Металлический навес с двускатной крышей" }
      ],
      lead: "Кровля выглядит более архитектурно и хорошо сочетается с домом.",
      text: "Металлочерепица подходит для навесов, которые должны быть частью общей архитектуры участка. Она уместна рядом с коттеджем, кирпичными столбами, декоративным забором и въездной группой в едином цвете.",
      specs: [
        ["Кровля", "металлочерепица"],
        ["Форма", "одно- / двускатная"],
        ["Каркас", "сталь"],
        ["Цвет", "под дом"]
      ],
      points: [
        "Лучше смотрится рядом с домами со скатной кровлей.",
        "Помогает сделать навес не временной конструкцией, а частью архитектуры.",
        "Требует аккуратного узла примыкания и продуманного водоотвода."
      ],
      included: [
        "Проектирование формы кровли и подбор цвета металлочерепицы.",
        "Сборка ферм и обрешетки под выбранный кровельный материал.",
        "Монтаж листов, коньков, планок и водоотвода при необходимости."
      ]
    }
  };

  const modal = document.querySelector("[data-fence-modal]");
  const detailCards = Array.from(document.querySelectorAll("[data-fence-detail]"));

  if (modal && detailCards.length) {
    const panel = modal.querySelector(".fence-detail-panel");
    const modalImage = modal.querySelector("[data-fence-modal-image]");
    const modalTag = modal.querySelector("[data-fence-modal-tag]");
    const modalKicker = modal.querySelector("[data-fence-modal-kicker]");
    const modalTitle = modal.querySelector("[data-fence-modal-title]");
    const modalLead = modal.querySelector("[data-fence-modal-lead]");
    const modalText = modal.querySelector("[data-fence-modal-text]");
    const modalSpecs = modal.querySelector("[data-fence-modal-specs]");
    const modalPoints = modal.querySelector("[data-fence-modal-points]");
    const modalIncluded = modal.querySelector("[data-fence-modal-included]");
    const modalThumbs = modal.querySelector("[data-fence-modal-thumbs]");
    const modalContent = modal.querySelector(".fence-detail-content");
    let activeTrigger = null;
    let modalScrollY = 0;

    const fillList = (target, items) => {
      target.replaceChildren();
      items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        target.append(li);
      });
    };

    const fillSpecs = specs => {
      modalSpecs.replaceChildren();
      specs.forEach(([label, value]) => {
        const item = document.createElement("article");
        const labelNode = document.createElement("span");
        const valueNode = document.createElement("strong");
        labelNode.textContent = label;
        valueNode.textContent = value;
        item.append(labelNode, valueNode);
        modalSpecs.append(item);
      });
    };

    const setModalImage = (detail, index) => {
      const gallery = detail.gallery?.length ? detail.gallery : [{ src: detail.image, alt: detail.imageAlt }];
      const selected = gallery[index] || gallery[0];
      modalImage.src = selected.src;
      modalImage.alt = selected.alt || detail.imageAlt;

      if (!modalThumbs) return;
      Array.from(modalThumbs.children).forEach((button, buttonIndex) => {
        button.classList.toggle("is-active", buttonIndex === index);
      });
    };

    const fillModalThumbs = (detail, activeIndex) => {
      if (!modalThumbs) return;
      const gallery = detail.gallery?.length ? detail.gallery : [{ src: detail.image, alt: detail.imageAlt }];
      modalThumbs.replaceChildren();
      gallery.forEach((photo, index) => {
        const button = document.createElement("button");
        const image = document.createElement("img");
        button.type = "button";
        button.className = "fence-detail-thumb";
        button.setAttribute("aria-label", `Показать фото ${index + 1}`);
        image.src = photo.src;
        image.alt = "";
        button.append(image);
        button.addEventListener("click", event => {
          event.stopPropagation();
          setModalImage(detail, index);
        });
        modalThumbs.append(button);
      });
      setModalImage(detail, activeIndex);
    };

    const setCardImage = (card, detail, index) => {
      const gallery = detail.gallery?.length ? detail.gallery : [{ src: detail.image, alt: detail.imageAlt }];
      const nextIndex = (index + gallery.length) % gallery.length;
      const selected = gallery[nextIndex];
      const image = card.querySelector(".fences-type-media img");
      const counter = card.querySelector("[data-fence-card-count]");
      card.dataset.galleryIndex = String(nextIndex);
      if (image) {
        image.src = selected.src;
        image.alt = selected.alt || detail.imageAlt;
      }
      if (counter) counter.textContent = `${nextIndex + 1} / ${gallery.length}`;
    };

    const closeModal = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-fence-modal-open");
      document.body.style.top = "";
      window.scrollTo(0, modalScrollY);
      if (activeTrigger) activeTrigger.focus({ preventScroll: true });
    };

    const openModal = (key, imageIndex = 0) => {
      const detail = fenceDetails[key];
      if (!detail) return;

      activeTrigger = document.activeElement;
      modalScrollY = window.scrollY;
      modalTag.textContent = detail.tag;
      modalKicker.textContent = detail.kicker;
      modalTitle.textContent = detail.title;
      modalLead.textContent = detail.lead;
      modalText.textContent = detail.text;
      fillSpecs(detail.specs);
      fillList(modalPoints, detail.points);
      fillList(modalIncluded, detail.included);
      fillModalThumbs(detail, imageIndex);

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-fence-modal-open");
      document.body.style.top = `-${modalScrollY}px`;
      if (modalContent) modalContent.scrollTop = 0;
      panel.focus({ preventScroll: true });
    };

    modal.addEventListener(
      "wheel",
      event => {
        if (!modal.classList.contains("is-open") || !modalContent) return;
        if (event.composedPath().includes(modalContent)) return;
        modalContent.scrollTop += event.deltaY;
        event.preventDefault();
      },
      { passive: false }
    );

    detailCards.forEach(card => {
      const key = card.dataset.fenceDetail;
      const detail = fenceDetails[key];
      const button = card.querySelector(".fences-type-open");
      const media = card.querySelector(".fences-type-media");
      const cardImage = card.querySelector(".fences-type-media img");
      if (detail?.gallery?.length && cardImage) {
        cardImage.src = detail.gallery[0].src;
        cardImage.alt = detail.gallery[0].alt || detail.imageAlt;
      }

      if (detail?.gallery?.length) {
        card.dataset.galleryIndex = "0";
        const controls = document.createElement("div");
        const previous = document.createElement("button");
        const next = document.createElement("button");
        const counter = document.createElement("span");
        controls.className = "fences-card-arrows";
        previous.type = "button";
        next.type = "button";
        previous.className = "fences-card-arrow fences-card-arrow-prev";
        next.className = "fences-card-arrow fences-card-arrow-next";
        previous.setAttribute("aria-label", `Предыдущее фото: ${detail.title}`);
        next.setAttribute("aria-label", `Следующее фото: ${detail.title}`);
        counter.className = "fences-card-count";
        counter.setAttribute("data-fence-card-count", "");
        previous.textContent = "‹";
        next.textContent = "›";
        counter.textContent = `1 / ${detail.gallery.length}`;

        previous.addEventListener("click", event => {
          event.stopPropagation();
          setCardImage(card, detail, Number(card.dataset.galleryIndex || 0) - 1);
        });

        next.addEventListener("click", event => {
          event.stopPropagation();
          setCardImage(card, detail, Number(card.dataset.galleryIndex || 0) + 1);
        });

        controls.append(previous, counter, next);
        media?.append(controls);
      }

      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Открыть подробности: ${card.querySelector("h3")?.textContent || "забор"}`);

      card.addEventListener("click", () => openModal(key, Number(card.dataset.galleryIndex || 0)));
      card.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openModal(key, Number(card.dataset.galleryIndex || 0));
      });

      if (button) {
        button.addEventListener("click", event => {
          event.stopPropagation();
          openModal(key, Number(card.dataset.galleryIndex || 0));
        });
      }
    });

    modal.querySelectorAll("[data-fence-close]").forEach(closeControl => {
      closeControl.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

  const revealSelector = [
    ".section-head",
    ".metrics-showcase",
    ".metrics-grid article",
    ".materials-advantage",
    ".product-tile",
    ".service-card",
    ".calculator-card",
    ".process-grid article",
    ".showcase-card",
    ".contact-copy",
    ".contact-form",
    ".fences-hero-copy",
    ".fences-hero-panel",
    ".fences-type-card",
    ".fences-material-list article",
    ".fences-project-grid article",
    ".fences-contact-copy",
    ".fences-form",
    ".canopies-material-copy",
    ".canopies-material-board",
    ".canopies-use-card",
    ".canopies-contact-copy",
    ".canopies-form",
    ".gates-stitch-hero-copy",
    ".gates-stitch-hero-media-wrap",
    ".gates-stitch-card",
    ".gates-stitch-projects article",
    ".gates-stitch-contact-copy",
    ".gates-stitch-form"
  ].join(",");

  const revealItems = Array.from(document.querySelectorAll(revealSelector));
  revealItems.forEach((item, index) => {
    item.classList.add("reveal-target");
    item.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach(item => observer.observe(item));
})();
