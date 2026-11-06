import type { Localized } from '../i18n'

export type ServiceIcon = 'company' | 'person' | 'address' | 'files'

export interface Service {
  slug: string
  icon: ServiceIcon
  image: string
  title: Localized
  summary: Localized
  intro: Localized
  forWho: Localized[]
  included: Localized[]
  documents: Localized[]
  steps: Localized[]
  faq: { q: Localized; a: Localized }[]
}

const cin: Localized = {
  fr: "Carte nationale d'identité ou passeport des associés",
  ar: 'البطاقة الوطنية أو جواز السفر للشركاء',
  en: 'National ID card or passport of each partner',
}

export const services: Service[] = [
  {
    slug: 'creation-sarl',
    icon: 'company',
    image: '/images/creation.webp',
    title: {
      fr: 'Création SARL / SARL AU',
      ar: 'تأسيس شركة ذات مسؤولية محدودة',
      en: 'SARL / single-member SARL formation',
    },
    summary: {
      fr: 'Statuts, formalités et immatriculation : nous préparons le dossier complet de votre société.',
      ar: 'النظام الأساسي والإجراءات والتسجيل: نحضّر الملف الكامل لشركتك.',
      en: 'Articles, formalities and registration: we prepare the full file for your company.',
    },
    intro: {
      fr: "La SARL est la forme la plus utilisée par les PME au Maroc ; la SARL AU permet d'entreprendre seul avec une responsabilité limitée. Nous vous aidons à choisir, puis nous préparons et suivons le dossier de création.",
      ar: 'الشركة ذات المسؤولية المحدودة هي الشكل الأكثر استعمالًا لدى المقاولات الصغرى والمتوسطة بالمغرب، والشركة بشريك وحيد تتيح المقاولة بشكل فردي مع مسؤولية محدودة. نساعدك على الاختيار ثم نحضّر ملف التأسيس ونتابعه.',
      en: 'The SARL is the most common legal form for small businesses in Morocco; the single-member SARL lets you start alone with limited liability. We help you choose, then prepare and follow the formation file.',
    },
    forWho: [
      { fr: 'Associés qui lancent un commerce ou un service', ar: 'شركاء يطلقون نشاطًا تجاريًا أو خدماتيًا', en: 'Partners launching a shop or service business' },
      { fr: 'Entrepreneurs seuls qui veulent protéger leur patrimoine', ar: 'مقاولون بمفردهم يريدون حماية ذمتهم', en: 'Solo founders who want to protect personal assets' },
      { fr: 'Porteurs de projets touristiques ou de restauration', ar: 'حاملو مشاريع سياحية أو مطاعم', en: 'Tourism and restaurant project owners' },
    ],
    included: [
      { fr: 'Diagnostic et choix de la forme juridique', ar: 'التشخيص واختيار الشكل القانوني', en: 'Diagnosis and choice of legal form' },
      { fr: 'Demande du certificat négatif (dénomination)', ar: 'طلب الشهادة السلبية (التسمية)', en: 'Company name certificate (certificat négatif) request' },
      { fr: 'Rédaction des statuts et des actes de création', ar: 'تحرير النظام الأساسي وعقود التأسيس', en: 'Drafting of articles and formation deeds' },
      { fr: 'Suivi des formalités : registre de commerce, identifiants fiscaux, CNSS', ar: 'تتبع الإجراءات: السجل التجاري، المعرفات الضريبية، الضمان الاجتماعي', en: 'Follow-up of formalities: trade register, tax IDs, CNSS' },
    ],
    documents: [
      cin,
      { fr: 'Choix de 3 dénominations par ordre de préférence', ar: 'اقتراح 3 تسميات حسب الأفضلية', en: 'Three company name options, in order of preference' },
      { fr: 'Justificatif du siège (bail ou contrat de domiciliation)', ar: 'ما يثبت المقر (عقد كراء أو عقد توطين)', en: 'Proof of registered office (lease or domiciliation contract)' },
      { fr: 'Attestation bancaire de dépôt du capital, le cas échéant', ar: 'شهادة بنكية بإيداع رأس المال عند الاقتضاء', en: 'Bank certificate of capital deposit, where applicable' },
    ],
    steps: [
      { fr: 'Consultation et choix de la structure', ar: 'الاستشارة واختيار البنية', en: 'Consultation and choice of structure' },
      { fr: 'Réservation de la dénomination', ar: 'حجز التسمية', en: 'Company name reservation' },
      { fr: 'Rédaction et signature des statuts', ar: 'تحرير النظام الأساسي وتوقيعه', en: 'Drafting and signing the articles' },
      { fr: 'Immatriculation et remise du dossier final', ar: 'التسجيل وتسليم الملف النهائي', en: 'Registration and hand-over of the final file' },
    ],
    faq: [
      {
        q: { fr: 'Faut-il un capital minimum ?', ar: 'هل يلزم حد أدنى لرأس المال؟', en: 'Is there a minimum share capital?' },
        a: {
          fr: 'Le montant du capital se décide avec vous selon le projet ; nous vous expliquons les règles applicables lors du diagnostic.',
          ar: 'يُحدد مبلغ رأس المال معك حسب المشروع، ونشرح لك القواعد المعمول بها أثناء التشخيص.',
          en: 'The amount is decided with you based on the project; we explain the applicable rules during the diagnosis.',
        },
      },
      {
        q: { fr: 'Puis-je passer de SARL AU à SARL plus tard ?', ar: 'هل يمكن التحول لاحقًا من شريك وحيد إلى عدة شركاء؟', en: 'Can I switch from single-member to multi-partner later?' },
        a: {
          fr: "Oui, l'entrée de nouveaux associés est possible par une modification des statuts.",
          ar: 'نعم، يمكن دخول شركاء جدد عبر تعديل النظام الأساسي.',
          en: 'Yes, new partners can join through an amendment of the articles.',
        },
      },
    ],
  },
  {
    slug: 'auto-entrepreneur',
    icon: 'person',
    image: '/images/auto-entrepreneur.webp',
    title: {
      fr: 'Statut auto-entrepreneur',
      ar: 'نظام المقاول الذاتي',
      en: 'Auto-entrepreneur status',
    },
    summary: {
      fr: "Un démarrage simple pour exercer en indépendant, avec une fiscalité allégée selon l'activité.",
      ar: 'بداية بسيطة للعمل بشكل مستقل، مع ضريبة مخففة حسب النشاط.',
      en: 'A simple way to start working independently, with lighter taxation depending on the activity.',
    },
    intro: {
      fr: "Le statut d'auto-entrepreneur permet d'exercer une activité en nom propre avec des formalités réduites. Nous vérifions que votre activité y est éligible, préparons l'inscription et vous expliquons vos obligations déclaratives.",
      ar: 'يتيح نظام المقاول الذاتي ممارسة نشاط باسمك الشخصي بإجراءات مبسطة. نتحقق من أهلية نشاطك، ونحضّر التسجيل، ونشرح لك التزاماتك التصريحية.',
      en: 'Auto-entrepreneur status lets you work under your own name with reduced formalities. We check your activity is eligible, prepare the registration and explain your reporting obligations.',
    },
    forWho: [
      { fr: 'Freelances, artisans et prestataires', ar: 'المستقلون والحرفيون ومقدمو الخدمات', en: 'Freelancers, craftspeople and service providers' },
      { fr: 'Personnes qui testent une activité', ar: 'من يرغبون في تجربة نشاط', en: 'People testing a new activity' },
      { fr: "Activités au chiffre d'affaires modéré", ar: 'أنشطة برقم معاملات معتدل', en: 'Activities with moderate turnover' },
    ],
    included: [
      { fr: "Vérification de l'éligibilité de l'activité", ar: 'التحقق من أهلية النشاط', en: 'Eligibility check for the activity' },
      { fr: "Préparation de la demande d'inscription", ar: 'تحضير طلب التسجيل', en: 'Preparation of the registration request' },
      { fr: 'Explication des plafonds et des déclarations', ar: 'شرح سقوف رقم المعاملات والتصريحات', en: 'Explanation of turnover caps and declarations' },
      { fr: 'Calendrier de vos premières échéances', ar: 'جدول آجالك الأولى', en: 'Calendar of your first deadlines' },
    ],
    documents: [
      { fr: "Carte nationale d'identité", ar: 'البطاقة الوطنية', en: 'National ID card' },
      { fr: "Description de l'activité envisagée", ar: 'وصف النشاط المرتقب', en: 'Description of the planned activity' },
      { fr: "Adresse d'exercice ou de domiciliation", ar: 'عنوان مزاولة النشاط أو التوطين', en: 'Business or domiciliation address' },
    ],
    steps: [
      { fr: 'Consultation et vérification du projet', ar: 'الاستشارة والتحقق من المشروع', en: 'Consultation and project check' },
      { fr: 'Constitution du dossier', ar: 'إعداد الملف', en: 'File preparation' },
      { fr: "Dépôt de la demande d'inscription", ar: 'إيداع طلب التسجيل', en: 'Submission of the registration request' },
      { fr: 'Point sur vos obligations', ar: 'جلسة حول التزاماتك', en: 'Review of your obligations' },
    ],
    faq: [
      {
        q: { fr: 'Toutes les activités sont-elles éligibles ?', ar: 'هل كل الأنشطة مؤهلة؟', en: 'Is every activity eligible?' },
        a: {
          fr: "Non, certaines activités sont exclues du statut. Nous vérifions votre cas lors de la consultation.",
          ar: 'لا، بعض الأنشطة مستثناة من هذا النظام. نتحقق من حالتك خلال الاستشارة.',
          en: 'No, some activities are excluded from the status. We check your case during the consultation.',
        },
      },
      {
        q: { fr: 'Que se passe-t-il si mon activité grandit ?', ar: 'ماذا يحدث إذا توسع نشاطي؟', en: 'What if my business grows?' },
        a: {
          fr: "Au-delà des plafonds, un passage en société (souvent en SARL AU) est à envisager. Nous pouvons vous accompagner dans cette transition.",
          ar: 'عند تجاوز السقوف، يُستحسن التحول إلى شركة (غالبًا بشريك وحيد). يمكننا مواكبتك في هذا الانتقال.',
          en: 'Beyond the caps, moving to a company (often a single-member SARL) should be considered. We can support that transition.',
        },
      },
    ],
  },
  {
    slug: 'domiciliation',
    icon: 'address',
    image: '/images/domiciliation.webp',
    title: {
      fr: "Domiciliation d'entreprise",
      ar: 'توطين المقاولات',
      en: 'Business domiciliation',
    },
    summary: {
      fr: 'Une adresse de siège pour votre société, avec réception et notification de votre courrier.',
      ar: 'عنوان مقر لشركتك، مع استقبال بريدك وإشعارك به.',
      en: 'A registered office address for your company, with mail reception and notification.',
    },
    intro: {
      fr: "La domiciliation permet d'immatriculer votre entreprise sans louer de local. Idéal pour démarrer, pour les MRE ou pour séparer adresse personnelle et adresse professionnelle.",
      ar: 'يتيح التوطين تسجيل مقاولتك دون كراء محل. مثالي للبداية ولمغاربة العالم أو لفصل العنوان الشخصي عن المهني.',
      en: 'Domiciliation lets you register your company without renting premises. Ideal to get started, for diaspora founders, or to keep personal and business addresses separate.',
    },
    forWho: [
      { fr: 'Sociétés en création', ar: 'الشركات في طور التأسيس', en: 'Companies being formed' },
      { fr: 'MRE et investisseurs à distance', ar: 'مغاربة العالم والمستثمرون عن بعد', en: 'Diaspora and remote investors' },
      { fr: 'Activités sans besoin de local', ar: 'أنشطة لا تحتاج إلى محل', en: 'Businesses that need no premises' },
    ],
    included: [
      { fr: 'Contrat de domiciliation', ar: 'عقد التوطين', en: 'Domiciliation contract' },
      { fr: 'Adresse du siège social', ar: 'عنوان المقر الاجتماعي', en: 'Registered office address' },
      { fr: 'Réception et notification du courrier', ar: 'استقبال البريد والإشعار به', en: 'Mail reception and notification' },
      { fr: 'Salle de réunion sur réservation (exemple)', ar: 'قاعة اجتماعات عند الحجز (مثال)', en: 'Meeting room on booking (example)' },
    ],
    documents: [
      { fr: "Pièce d'identité du gérant", ar: 'وثيقة هوية المسير', en: "Manager's ID" },
      { fr: 'Certificat négatif ou statuts', ar: 'الشهادة السلبية أو النظام الأساسي', en: 'Name certificate or articles of association' },
      { fr: 'Coordonnées de contact pour le courrier', ar: 'معلومات الاتصال الخاصة بالبريد', en: 'Contact details for mail handling' },
    ],
    steps: [
      { fr: 'Vérification du besoin', ar: 'التحقق من الحاجة', en: 'Needs check' },
      { fr: 'Signature du contrat', ar: 'توقيع العقد', en: 'Contract signature' },
      { fr: "Remise de l'attestation de domiciliation", ar: 'تسليم شهادة التوطين', en: 'Hand-over of domiciliation certificate' },
      { fr: 'Gestion du courrier au quotidien', ar: 'تدبير البريد يوميًا', en: 'Day-to-day mail handling' },
    ],
    faq: [
      {
        q: { fr: 'Puis-je transférer mon siège plus tard ?', ar: 'هل يمكنني نقل مقري لاحقًا؟', en: 'Can I move my office later?' },
        a: {
          fr: 'Oui, un transfert de siège se fait par une modification statutaire ; nous pouvons la préparer.',
          ar: 'نعم، يتم نقل المقر عبر تعديل النظام الأساسي، ويمكننا تحضيره.',
          en: 'Yes, a transfer is done by amending the articles; we can prepare it.',
        },
      },
      {
        q: { fr: 'Comment suis-je informé de mon courrier ?', ar: 'كيف أُخبر ببريدي؟', en: 'How am I told about my mail?' },
        a: {
          fr: 'Vous êtes notifié par message à la réception ; les modalités de récupération sont fixées au contrat.',
          ar: 'تتوصل بإشعار عند الاستقبال، وتُحدد طريقة الاستلام في العقد.',
          en: 'You get a message when mail arrives; pick-up arrangements are set in the contract.',
        },
      },
    ],
  },
  {
    slug: 'accompagnement',
    icon: 'files',
    image: '/images/accompagnement.webp',
    title: {
      fr: 'Accompagnement administratif & comptable',
      ar: 'المواكبة الإدارية والمحاسبية',
      en: 'Administrative & accounting support',
    },
    summary: {
      fr: 'Échéances, déclarations et formalités courantes : un suivi régulier pour rester en règle.',
      ar: 'الآجال والتصريحات والإجراءات الجارية: تتبع منتظم لتبقى في وضعية سليمة.',
      en: 'Deadlines, filings and routine formalities: regular follow-up to stay compliant.',
    },
    intro: {
      fr: "Après la création, les obligations s'enchaînent. Nous organisons votre calendrier, préparons les dossiers administratifs et coordonnons la tenue comptable avec un comptable agréé ou un expert-comptable de votre choix.",
      ar: 'بعد التأسيس تتوالى الالتزامات. ننظم جدولك، ونحضّر الملفات الإدارية، وننسق مسك المحاسبة مع محاسب معتمد أو خبير محاسب من اختيارك.',
      en: 'After formation, obligations pile up. We organise your calendar, prepare administrative files and coordinate bookkeeping with a licensed accountant of your choice.',
    },
    forWho: [
      { fr: 'Jeunes sociétés et TPE', ar: 'الشركات الناشئة والمقاولات الصغيرة جدًا', en: 'Young companies and micro-businesses' },
      { fr: 'Gérants qui manquent de temps', ar: 'مسيرون يفتقرون إلى الوقت', en: 'Busy managers' },
      { fr: 'Associés à distance', ar: 'شركاء عن بعد', en: 'Partners living elsewhere' },
    ],
    included: [
      { fr: 'Calendrier des échéances fiscales et sociales', ar: 'جدول الآجال الضريبية والاجتماعية', en: 'Calendar of tax and social deadlines' },
      { fr: 'Préparation des dossiers administratifs', ar: 'تحضير الملفات الإدارية', en: 'Preparation of administrative files' },
      { fr: 'Coordination avec votre comptable', ar: 'التنسيق مع محاسبك', en: 'Coordination with your accountant' },
      { fr: 'Modifications : transfert de siège, changement de gérant…', ar: 'التعديلات: نقل المقر، تغيير المسير…', en: 'Changes: office transfer, new manager…' },
    ],
    documents: [
      { fr: 'Statuts et pièces de création', ar: 'النظام الأساسي ووثائق التأسيس', en: 'Articles and formation documents' },
      { fr: 'Identifiants de la société', ar: 'معرفات الشركة', en: 'Company identifiers' },
      { fr: 'Dernières déclarations déposées', ar: 'آخر التصريحات المودعة', en: 'Latest filed returns' },
    ],
    steps: [
      { fr: 'Audit rapide de la situation', ar: 'افتحاص سريع للوضعية', en: 'Quick status review' },
      { fr: 'Plan de suivi et devis', ar: 'خطة التتبع وعرض السعر', en: 'Follow-up plan and quote' },
      { fr: 'Mise en place du calendrier', ar: 'وضع الجدول الزمني', en: 'Calendar set-up' },
      { fr: 'Points réguliers', ar: 'لقاءات منتظمة', en: 'Regular check-ins' },
    ],
    faq: [
      {
        q: { fr: 'Tenez-vous la comptabilité vous-mêmes ?', ar: 'هل تمسكون المحاسبة بأنفسكم؟', en: 'Do you do the bookkeeping yourselves?' },
        a: {
          fr: 'La tenue et la certification relèvent de professionnels habilités ; nous coordonnons avec le comptable de votre choix.',
          ar: 'مسك المحاسبة والمصادقة عليها من اختصاص مهنيين مؤهلين، ونحن ننسق مع المحاسب الذي تختاره.',
          en: 'Bookkeeping and certification are done by licensed professionals; we coordinate with the accountant you choose.',
        },
      },
      {
        q: { fr: 'Puis-je prendre ce service sans avoir créé chez vous ?', ar: 'هل يمكنني الاستفادة دون أن أؤسس شركتي عندكم؟', en: 'Can I use this without having formed my company with you?' },
        a: {
          fr: 'Oui, nous commençons par un état des lieux de votre dossier.',
          ar: 'نعم، نبدأ بجرد لوضعية ملفك.',
          en: 'Yes, we start with a review of your current file.',
        },
      },
    ],
  },
]

export function findService(slug: string | undefined) {
  return services.find((s) => s.slug === slug)
}
