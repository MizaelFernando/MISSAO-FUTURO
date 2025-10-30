let playerName = '';
let selectedCharacterKey = '';
let selectedCharacterColor = '';
const defaultBolinhaColor = '#c9d1d9';

let nameInput, startGameButton, errorMessage, setupScreen, gameScreen;
let characterCards, colorSwatches, previewImage, previewColorOverlay, previewText;

const characterNamesMap = { 'saude': 'Área da Saúde', 'exatas': 'Área da Exatas', 'humanas': 'Área da Humanas' };
const colorMap = { 'red': '#e63946', 'green': '#6a994e', 'purple': '#8b5cf6', 'yellow': '#f7b267', 'cyan': '#00bcd4', 'pink': '#ff69b4', 'teal': '#008080', 'gray': '#6c757d', 'bronze': '#cd7f32' };
const colorNameMap = { 'red': 'Vermelho', 'green': 'Verde', 'purple': 'Roxo', 'yellow': 'Amarelo', 'cyan': 'Ciano', 'pink': 'Rosa', 'teal': 'Azul Petróleo', 'gray': 'Cinza', 'bronze': 'Bronze' };

let playerScores = { "Analítico": 0, "Criativo": 0, "Cuidadoso": 0, "Prático": 0 };
let quizAnswers = {};
const quizQuestions = [
    { question: "1. Qual é a sua reação inicial a um novo desafio?", answers: [ { text: "Buscar dados, pesquisar e planejar.", profile: "Analítico" }, { text: "Começar a testar soluções na prática.", profile: "Prático" }, { text: "Buscar a opinião de outras pessoas.", profile: "Cuidadoso" }, { text: "Ter um 'insight' e criar algo novo.", profile: "Criativo" } ] },
    { question: "2. Qual tipo de atividade te atrai mais?", answers: [ { text: "Resolver quebra-cabeças complexos.", profile: "Analítico" }, { text: "Trabalhar com as mãos, construir.", profile: "Prático" }, { text: "Organizar eventos ou reuniões.", profile: "Cuidadoso" }, { text: "Desenhar, escrever ou compor.", profile: "Criativo" } ] },
    { question: "3. O que te motiva mais?", answers: [ { text: "A liberdade de inovar.", profile: "Criativo" }, { text: "A eficiência e conclusão de tarefas.", profile: "Prático" }, { text: "A precisão e exatidão.", profile: "Analítico" }, { text: "Fazer a diferença na vida das pessoas.", profile: "Cuidadoso" } ] },
    { question: "4. Como você resolve um problema?", answers: [ { text: "Soluções originais, brainstorming.", profile: "Criativo" }, { text: "Seguindo um manual ou procedimento.", profile: "Prático" }, { text: "Analisando variáveis e calculando risco.", profile: "Analítico" }, { text: "Discutindo com a equipe.", profile: "Cuidadoso" } ] },
    { question: "5. Qual é o seu papel em um grupo?", answers: [ { text: "Garantir harmonia e ouvir a todos.", profile: "Cuidadoso" }, { text: "Liderar a execução da meta.", profile: "Prático" }, { text: "Ser o especialista com dados.", profile: "Analítico" }, { text: "Ser a fonte de inspiração.", profile: "Criativo" } ] },
    { question: "6. Qual valor é mais importante para você?", answers: [ { text: "Empatia e fazer a diferença.", profile: "Cuidadoso" }, { text: "Inovação e liberdade.", profile: "Criativo" }, { text: "Eficiência e resultados.", profile: "Prático" }, { text: "Exatidão e lógica.", profile: "Analítico" } ] },
    { question: "7. O que você mais gosta de fazer?", answers: [ { text: "Colocar a mão na massa, consertar.", profile: "Prático" }, { text: "Estudar um assunto complexo.", profile: "Analítico" }, { text: "Criar algo novo (arte/música).", profile: "Criativo" }, { text: "Ajudar um amigo, voluntariado.", profile: "Cuidadoso" } ] },
    { question: "8. Como você aprende algo novo?", answers: [ { text: "Aprender fazendo, praticando.", profile: "Prático" }, { text: "Lendo tudo sobre o assunto.", profile: "Analítico" }, { text: "Observando e pedindo dicas.", profile: "Cuidadoso" }, { text: "Testando limites, imaginando.", profile: "Criativo" } ] }
];

const professionCardsDatabase = {
    'pedagogia': { title: 'Pedagogia', description: 'Atua na educação e ensino-aprendizagem.', course: 'Pedagogia (Superior)', salary: 'R$ 2k - 5k+', routine: 'Planejar aulas, acompanhar alunos.' },
    'odontologia': { title: 'Odontologia', description: 'Cuida da saúde bucal.', course: 'Odontologia (Superior)', salary: 'R$ 3.5k - 12k+', routine: 'Consultas, procedimentos clínicos.' },
    'psicologia': { title: 'Psicologia', description: 'Ajuda com desafios emocionais/mentais.', course: 'Psicologia (Superior)', salary: 'R$ 2.5k - 7k+', routine: 'Atendimento clínico, laudos.' },
    'direito': { title: 'Direito', description: 'Representa clientes em questões legais.', course: 'Direito (Superior)', salary: 'R$ 3k - 15k+', routine: 'Processos, audiências, consultoria.' },
    'ciencia_computacao': { title: 'Ciência da Computação', description: 'Foca nos fundamentos da computação.', course: 'Ciência da Computação (Superior)', salary: 'R$ 5k - 18k+', routine: 'Pesquisa, desenvolvimento de software base.' },
    'enfermagem': { title: 'Enfermagem', description: 'Cuida da saúde e bem-estar de pacientes.', course: 'Técnico / Superior em Enfermagem', salary: 'R$ 2.5k - 6k+', routine: 'Plantões, administrar medicação, cuidados.' },
    'medicina': { title: 'Medicina', description: 'Diagnostica e trata doenças humanas.', course: 'Medicina (Superior)', salary: 'R$ 8k - 30k+', routine: 'Consultas, cirurgias, plantões.' },
    'biomedicina': { title: 'Biomedicina', description: 'Pesquisa doenças e diagnósticos laboratoriais.', course: 'Biomedicina (Superior)', salary: 'R$ 2.5k - 7k+', routine: 'Análises clínicas, pesquisa, laudos.' },
    'administracao': { title: 'Administração', description: 'Gerencia recursos de uma empresa.', course: 'Administração (Superior)', salary: 'R$ 3k - 15k+', routine: 'Planejamento, finanças, RH.' },
    'educacao_fisica': { title: 'Educação Física', description: 'Promove a saúde através de atividades físicas.', course: 'Educação Física (Superior)', salary: 'R$ 2k - 6k+', routine: 'Aulas, treinamento, reabilitação.' },
    'fisioterapia': { title: 'Fisioterapia', description: 'Atua na reabilitação de movimentos.', course: 'Fisioterapia (Superior)', salary: 'R$ 2.5k - 8k+', routine: 'Atendimento, exercícios, reabilitação.' }
};
let phase2CurrentQuestionIndex = 0;
let unlockedCards = [];
const phase2Questions = [
    { question: "Curso para ser Pedagogo (a):", answers: { a: 'Eng. Civil', b: 'Design', c: 'Pedagogia', d: 'Artes Visuais.' }, correctAnswer: 'c', cardToUnlock: 'pedagogia' },
    { question: "Como se chama um profissional formado em Odontologia ?", answers: { a: 'Professor', b: 'Dentista / Odontólogo(a)', c: 'Filosofo', d: 'Enfermeiro(a)' }, correctAnswer: 'b', cardToUnlock: 'odontologia' },
    { question: "Quem estuda comportamento humano ?", answers: { a: 'Psiquiatra', b: 'Psicólogo(a)', c: 'Neurocientista', d: 'Filósofo' }, correctAnswer: 'b', cardToUnlock: 'psicologia' },
    { question: "Quem representa clientes em questões legais ?", answers: { a: 'Jornalista', b: 'Administrador', c: 'Advogado (a)', d: 'Contador' }, correctAnswer: 'c', cardToUnlock: 'direito' },
    { question: "Qual área foca em algoritmos e sistemas operacionais ?", answers: { a: 'Design Gráfico', b: 'Eng. Elétrica', c: 'Ciência da Computação', d: 'Marketing' }, correctAnswer: 'c', cardToUnlock: 'ciencia_computacao' },
    { question: "Qual profissional é especializado em reabilitação de movimentos?", answers: { a: 'Médico', b: 'Biomédico', c: 'Fisioterapeuta', d: 'Administrador' }, correctAnswer: 'c', cardToUnlock: 'fisioterapia' },
    { question: "Quem é o profissional que gerencia os recursos de uma organização?", answers: { a: 'Administrador(a)', b: 'Educador Físico', c: 'Advogado', d: 'Psicólogo' }, correctAnswer: 'a', cardToUnlock: 'administracao' },
    { question: "Qual curso forma o profissional para diagnósticos e tratamentos de doenças?", answers: { a: 'Biomedicina', b: 'Medicina', c: 'Enfermagem', d: 'Educação Física' }, correctAnswer: 'b', cardToUnlock: 'medicina' },
    { question: "Quem atua em análises clínicas e pesquisa de doenças?", answers: { a: 'Fisioterapeuta', b: 'Administrador', c: 'Biomédico(a)', d: 'Médico' }, correctAnswer: 'c', cardToUnlock: 'biomedicina' },
  	{ question: "Qual profissional planeja atividades físicas para saúde e bem-estar?", answers: { a: 'Educador(a) Físico(a)', b: 'Enfermeiro', c: 'Médico', d: 'Biomédico' }, correctAnswer: 'a', cardToUnlock: 'educacao_fisica' }
];

let phase3SelectedProfession = null; 
let phase3CurrentStepIndex = 0;
let phase3Score = 0;
const professionPaths = {
    'enfermagem': [ 
        { question: "1. Para iniciar o Curso Técnico de Enfermagem, o que é preciso?", options: ["Ter faculdade de medicina", "Ser maior de 18 e ter Ensino Médio (completo ou cursando)", "Fazer prova da OAB", "Apenas pagar a taxa"], correctAnswer: 1 },
        { question: "2. O que é foco principal do curso técnico (cerca de 2 anos)?", options: ["Cirurgia cardíaca", "Procedimentos básicos (injeção, curativo, banho)", "Gestão de hospital", "Desenvolver software"], correctAnswer: 1 },
        { question: "3. O estágio do curso técnico é:", options: ["Opcional, se o aluno for bem", "Proibido por lei", "Obrigatório e supervisionado em hospitais/clínicas", "Feito apenas em bonecos"], correctAnswer: 2 },
        { question: "4. Após o técnico, como se especializar?", options: ["Não é possível se especializar", "Fazendo uma faculdade de Direito", "Cursando uma pós-técnica (ex: Instrumentação Cirúrgica)", "Fazendo uma prova do COREN"], correctAnswer: 2 },
        { question: "5. Onde o Técnico de Enfermagem atua?", options: ["Apenas em cirurgias", "Hospitais, Clínicas, 'Home Care' (em casa)", "Apenas em escritórios", "Dando aulas na faculdade"], correctAnswer: 1 }
    ],
    'psicologia': [
        { question: "1. Qual o primeiro passo para se tornar Psicólogo(a)?", options: ["Fazer curso de coaching", "Vestibular para Psicologia (ENEM/SISU)", "Ler livros de autoajuda", "Fazer terapia"], correctAnswer: 1 },
        { question: "2. A graduação em Psicologia dura em média:", options: ["2 anos (Tecnólogo)", "10 anos (Doutorado)", "5 anos (Bacharelado/Formação)", "6 meses (Curso livre)"], correctAnswer: 2 },
        { question: "3. Durante a faculdade, os estágios em clínicas-escola são:", options: ["Obrigatórios e supervisionados", "Opcionais, valem bônus", "Proibidos até o último ano", "Focados apenas em empresas"], correctAnswer: 0 },
        { question: "4. Após formar e obter o CRP, como se especializar em 'TCC' (Terapia Cognitivo-Comportamental)?", options: ["Fazendo um curso de Pós-Graduação (Especialização)", "Lendo 3 livros sobre o tema", "Pedindo autorização ao juiz", "Isso se aprende apenas no estágio"], correctAnswer: 0 },
        { question: "5. Além de clínica particular, onde o psicólogo pode atuar?", options: ["Apenas em laboratórios", "Somente dando aulas", "Escolas, Hospitais, Empresas (RH) e no Setor Público", "Apenas remotamente (online)"], correctAnswer: 2 }
    ],
    'pedagogia': [
        { question: "1. Qual o primeiro passo para a formação em Pedagogia?", options: ["Trabalhar como babá", "Vestibular para Pedagogia (ENEM/SISU)", "Curso de contação de histórias", "Fazer um intercâmbio"], correctAnswer: 1 },
        { question: "2. A graduação em Pedagogia (Licenciatura) dura em média:", options: ["1 ano", "2 anos", "6 anos", "4 anos"], correctAnswer: 3 },
        { question: "3. O estágio supervisionado em escolas é uma parte...", options: ["Obrigatória da formação", "Opcional (só para quem quer dar aula)", "Proibida", "Feita apenas na biblioteca"], correctAnswer: 0 },
        { question: "4. Após formar, como se especializar em 'Psicopedagogia'?", options: ["Basta ler sobre o assunto", "Fazendo uma pós-graduação na área", "Trabalhando 5 anos em escola", "Fazendo um curso de inglês"], correctAnswer: 1 },
        { question: "5. O(a) Pedagogo(a) pode atuar em:", options: ["Apenas escolas infantis", "Escolas (gestão ou aula), Empresas (treinamento) e Hospitais", "Somente em museus", "Apenas em creches públicas"], correctAnswer: 1 }
    ],
    'direito': [
        { question: "1. Qual o primeiro passo para a carreira em Direito?", options: ["Assistir séries de tribunal", "Vestibular para Direito (ENEM/SISU)", "Trabalhar como assistente", "Ler a Constituição"], correctAnswer: 1 },
        { question: "2. A graduação em Direito (Bacharelado) dura em média:", options: ["3 anos", "10 anos", "5 anos", "2 anos"], correctAnswer: 2 },
        { question: "3. O estágio em escritórios ou órgãos públicos (ex: Fórum) é:", options: ["Fundamental para a prática (obrigatório ou não)", "Proibido até o 4º ano", "Opcional, não conta muito", "Focado apenas em filosofia"], correctAnswer: 0 },
        { question: "4. Qual exame é obrigatório para poder advogar após a faculdade?", options: ["Concurso para Juiz", "Exame da OAB", "Prova do MEC", "Exame do Fórum"], correctAnswer: 1 },
        { question: "5. Um bacharel em Direito aprovado na OAB (Advogado) pode atuar em:", options: ["Apenas em delegacias", "Advocacia privada, Empresas ou Concursos (Juiz, Promotor)", "Somente em escolas", "Apenas no exterior"], correctAnswer: 1 }
    ],
    'ciencia_computacao': [
        { question: "1. Qual o primeiro passo para a graduação em Ciência da Computação?", options: ["Aprender a formatar PC", "Vestibular para CC (ENEM/SISU)", "Curso técnico de redes", "Jogar videogame"], correctAnswer: 1 },
        { question: "2. O curso de CC (Bacharelado) dura 4 anos e foca em:", options: ["Conserto de hardware", "Apenas design de sites", "Fundamentos (Algoritmos, Cálculo, Estrutura de Dados)", "Marketing digital"], correctAnswer: 2 },
        { question: "3. O estágio em empresas de software durante a faculdade é:", options: ["Obrigatório e fundamental para a prática", "Proibido", "Focado em consertar impressoras", "Opcional e pouco valorizado"], correctAnswer: 0 },
        { question: "4. Após formar, como se especializar em 'Inteligência Artificial'?", options: ["Lendo blogs de tecnologia", "Mestrado, Doutorado ou Pós-Graduação na área", "Fazendo um curso de Excel", "Trabalhando com hardware"], correctAnswer: 1 },
        { question: "5. Onde o Cientista da Computação pode atuar?", options: ["Apenas em lojas de informática", "Empresas de tecnologia (Dev, P&D), Academia ou Startups", "Somente em bancos", "Apenas formatando computadores"], correctAnswer: 1 }
    ],
    'odontologia': [
        { question: "1. Qual é a principal forma de ingresso no curso superior de Odontologia no Brasil?", options: ["Exame da OAB", "Entrevista com o CRO", "Vestibular ou SISU (ENEM)", "Curso técnico prévio"], correctAnswer: 2 },
        { question: "2. O curso de Odontologia dura em média 5 anos (10 semestres) e é de qual tipo?", options: ["Bacharelado (período integral)", "Tecnólogo (2 anos)", "Licenciatura (focado em aulas)", "Ensino a Distância (EAD)"], correctAnswer: 0 },
        { question: "3. Durante a faculdade, o que é fundamental e obrigatório para a formação prática?", options: ["Estágio em hospitais gerais", "Atendimento na clínica-escola da faculdade", "Trabalhar em um consultório particular", "Escrever artigos científicos"], correctAnswer: 1 },
        { question: "4. Após se formar e obter o CRO, como o dentista se torna um 'Ortodontista' (aparelhos)?", options: ["Apenas fazendo uma prova de título", "Com 10 anos de experiência", "Fazendo um curso de Pós-Graduação (Especialização)", "Através de um Mestrado"], correctAnswer: 2 },
        { question: "5. Além de um consultório próprio, onde um(a) Dentista / Odontólogo(a) pode atuar?", options: ["Apenas em escolas, ensinando", "Em tribunais, como perito", "Hospitais, postos de saúde (SUS) e clínicas", "Somente em laboratórios de prótese"], correctAnswer: 2 }
    ],
    'medicina': [
        { question: "1. Qual o primeiro passo para a carreira de Medicina?", options: ["Vestibular/ENEM (curso de 6 anos)", "Curso técnico de enfermagem", "Residência médica", "Trabalhar em farmácia"], correctAnswer: 0 },
        { question: "2. O curso de Medicina (6 anos) é dividido em:", options: ["Apenas aulas teóricas", "Ciclo Básico, Clínico e Internato", "Apenas cirurgias", "3 anos de EAD e 3 presenciais"], correctAnswer: 1 },
        { question: "3. O Internato (últimos 2 anos) é um estágio:", options: ["Opcional, feito em casa", "Focado em gestão de hospital", "Obrigatório, com prática em hospitais", "Apenas em laboratório"], correctAnswer: 2 },
        { question: "4. Após os 6 anos, para se tornar 'Cirurgião Plástico', o que é preciso?", options: ["Nada, já é especialista", "Prestar prova para Residência Médica", "Fazer um curso de 1 ano", "Trabalhar 2 anos no SUS"], correctAnswer: 1 },
        { question: "5. Onde o Médico(a) pode atuar?", options: ["Apenas em postos de saúde", "Hospitais, Clínicas, Consultórios e Setor Público", "Somente em laboratórios", "Apenas dando aulas"], correctAnswer: 1 }
    ],
    'biomedicina': [
        { question: "1. Qual o primeiro passo para a graduação em Biomedicina?", options: ["Curso de farmácia", "Vestibular/ENEM (curso de 4 anos)", "Trabalhar em laboratório", "Curso de biologia"], correctAnswer: 1 },
        { question: "2. O curso de Biomedicina foca em:", options: ["Apenas cirurgias", "Pesquisa de doenças e análises laboratoriais", "Atendimento direto ao paciente", "Gestão de empresas"], correctAnswer: 1 },
        { question: "3. O estágio supervisionado (ex: em Análises Clínicas) é:", options: ["Obrigatório para a formação", "Opcional, vale bônus", "Proibido por lei", "Feito apenas no computador"], correctAnswer: 0 },
        { question: "4. Após formar, como o biomédico atua em 'Perícia Criminal'?", options: ["Basta ter o diploma", "Prestando Concurso Público específico", "Fazendo residência médica", "Curso de 6 meses de investigação"], correctAnswer: 1 },
        { question: "5. O Biomédico(a) atua principalmente em:", options: ["Hospitais (atendendo pacientes)", "Escritórios de advocacia", "Laboratórios, Indústria Farmacêutica e Pesquisa", "Apenas em escolas"], correctAnswer: 2 }
    ],
    'administracao': [
        { question: "1. Qual o primeiro passo para a graduação em Administração?", options: ["Curso de contabilidade", "Vestibular/ENEM (curso de 4 anos)", "Abrir uma empresa", "Trabalhar com vendas"], correctAnswer: 1 },
        { question: "2. O curso de Administração (ADM) é generalista e aborda:", options: ["Apenas matemática financeira", "Finanças, Marketing, RH e Logística", "Apenas leis trabalhistas", "Somente design de produtos"], correctAnswer: 1 },
        { question: "3. O estágio em empresas durante o curso é:", options: ["Proibido até o último ano", "Fundamental para a prática (obrigatório ou não)", "Focado apenas em vender", "Opcional e pouco valorizado"], correctAnswer: 1 },
        { question: "4. Após formar e obter o CRA, como se especializar em 'Logística'?", options: ["Fazendo uma Pós-Graduação (MBA)", "Lendo 5 livros sobre o tema", "Trabalhando 1 ano na área", "Não é possível"], correctAnswer: 0 },
        { question: "5. O(A) Administrador(a) pode atuar em:", options: ["Qualquer tipo de empresa (pública ou privada)", "Apenas em bancos", "Somente no setor de RH", "Apenas como professor"], correctAnswer: 0 }
    ],
    'educacao_fisica': [
        { question: "1. Para atuar na área, o primeiro passo é:", options: ["Ser atleta", "Vestibular/ENEM (Licenciatura ou Bacharelado)", "Curso de primeiros socorros", "Trabalhar em academia"], correctAnswer: 1 },
        { question: "2. Qual a diferença entre Licenciatura e Bacharelado?", options: ["Nenhuma, são iguais", "Licenciatura dá aulas em escolas; Bacharelado atua fora (academias, clubes)", "Bacharelado é para atletas", "Licenciatura é curso técnico"], correctAnswer: 1 },
        { question: "3. O estágio supervisionado é:", options: ["Obrigatório em ambas as formações", "Opcional, se o aluno for bom", "Proibido", "Feito apenas assistindo vídeos"], correctAnswer: 0 },
        { question: "4. Após formar (Bacharelado) e obter o CREF, como se tornar 'Personal Trainer'?", options: ["Basta querer", "É preciso se especializar e construir clientela", "Fazer uma prova da prefeitura", "Fazer um curso de 2 dias"], correctAnswer: 1 },
        { question: "5. Onde o profissional (Bacharel) pode atuar?", options: ["Apenas em escolas", "Academias, Clubes, Hospitais (reabilitação) e como Personal", "Somente em escritórios", "Apenas em time de futebol"], correctAnswer: 1 }
    ],
    'fisioterapia': [
        { question: "1. Qual o primeiro passo para a graduação em Fisioterapia?", options: ["Curso de massagem", "Vestibular/ENEM (curso de 5 anos)", "Curso de Educação Física", "Trabalhar em clínica"], correctAnswer: 1 },
        { question: "2. O curso de Fisioterapia foca em:", options: ["Apenas cirurgias", "Estudo do movimento humano e reabilitação", "Desenvolvimento de remédios", "Gestão de hospitais"], correctAnswer: 1 },
        { question: "3. O estágio em clínicas ou hospitais durante o curso é:", options: ["Obrigatório e supervisionado", "Opcional, vale bônus", "Proibido", "Focado apenas em idosos"], correctAnswer: 0 },
        { question: "4. Após formar e obter o CREFITO, como se especializar em 'Fisioterapia Esportiva'?", options: ["Fazendo uma Pós-Graduação na área", "Trabalhando em 3 clubes", "Basta ler sobre o assunto", "Não é possível se especializar"], correctAnswer: 0 },
        { question: "5. Onde o Fisioterapeuta pode atuar?", options: ["Apenas em SPAs", "Clínicas, Hospitais, Clubes Esportivos e 'Home Care'", "Somente em academias", "Apenas em laboratórios"], correctAnswer: 1 }
    ]
};

let phase4CurrentScenarioIndex = 0;
let phase4MotivationScore = 0;
const phase4Scenarios = [
    { situacao: "Você precisa estudar para a prova de amanhã, mas seu celular não para de apitar com notificações.", opcoes: [{ texto: "Silencia tudo, foca 2h, depois olha.", resultado: "Você avança muito e se sente no controle.", impacto: +3 },{ texto: "Dá 'só uma olhadinha' de 5 min.", resultado: "A 'olhadinha' vira 1 hora. A culpa e o pânico aumentam.", impacto: -3 },{ texto: "Tenta estudar com o celular do lado.", resultado: "Você lê a mesma página 10x e não entende nada.", impacto: -1 }] },
    { situacao: "Você se dedicou, mas tirou uma nota baixa em uma matéria importante.", opcoes: [{ texto: "Desiste da matéria: 'Não sou bom nisso'.", resultado: "Você se sente frustrado e acumula a matéria.", impacto: -3 },{ texto: "Procura o professor para entender onde errou.", resultado: "Você descobre os erros e se sente mais confiante para a recuperação.", impacto: +3 },{ texto: "Culpa o professor e não faz nada.", resultado: "Você continua com a nota baixa e não aprendeu.", impacto: -2 },{ texto: "Estuda o dobro para a próxima prova.", resultado: "É uma boa atitude, mas sem entender o erro, pode não ser o bastante.", impacto: +1 }] },
    { situacao: "No meio do semestre, você começa a pensar: 'Será que escolhi o curso certo?'", opcoes: [{ texto: "Ignora a dúvida. 'Já comecei, tenho que terminar'.", resultado: "A dúvida vira ansiedade e sua motivação cai.", impacto: -2 },{ texto: "Tranca o curso imediatamente.", resultado: "Uma decisão precipitada. Você pode se arrepender.", impacto: -1 },{ texto: "Conversa com veteranos e profissionais da área.", resultado: "Você ganha perspectiva e entende melhor a profissão.", impacto: +3 }] },
    { situacao: "Seu colega parece entender tudo, já tem estágio e você se sente 'atrasado'.", opcoes: [{ texto: "Evita o colega e se isola.", resultado: "A comparação piora e você perde a chance de aprender.", impacto: -2 },{ texto: "Pede dicas de estudo para ele.", resultado: "Você descobre um novo método e faz uma conexão valiosa.", impacto: +3 },{ texto: "Finge que não se importa, mas fica ansioso.", resultado: "Sua energia é gasta com ansiedade, não com estudo.", impacto: -1 }] },
    { situacao: "É sexta-feira. Você tem um trabalho enorme para entregar segunda, mas seus amigos te chamam para sair.", opcoes: [{ texto: "Vai para a festa e 'esquece' o trabalho.", resultado: "Seu domingo vira um pesadelo de pânico e café.", impacto: -2 },{ texto: "Recusa e passa a sexta inteira trabalhando.", resultado: "Você avança, mas se sente exausto e isolado.", impacto: +1 },{ texto: "Adelanta o trabalho à tarde e sai com eles mais tarde.", resultado: "Equilíbrio! Você se diverte e avança no trabalho.", impacto: +3 }] },
    { situacao: "Sua família pergunta todo domingo: 'E aí, já arrumou estágio? E as notas?'", opcoes: [{ texto: "Mente e diz que está 'tudo ótimo' para evitar conflito.", resultado: "A pressão interna aumenta, pois agora você tem que sustentar a mentira.", impacto: -2 },{ texto: "Explode e briga com eles.", resultado: "O clima fica péssimo e a pressão não diminui.", impacto: -1 },{ texto: "Explica seus planos e o que está fazendo (com calma).", resultado: "Eles podem não entender 100%, mas se sentem mais seguros.", impacto: +2 }] },
    { situacao: "Você está exausto, dormindo 4h por noite para dar conta de tudo (prova, trabalho, vida social).", opcoes: [{ texto: "'Toma um energético' e continua no mesmo ritmo.", resultado: "Seu corpo falha. Você adoece e atrasa tudo.", impacto: -3 },{ texto: "Sacrifica o fim de semana para dormir.", resultado: "Você recupera o sono, mas perde o lazer.", impacto: +1 },{ texto: "Revisa a agenda, corta 1 atividade e dorme 7h.", resultado: "Você fica mais produtivo e saudável a longo prazo.", impacto: +3 }] },
    { situacao: "Falta dinheiro para o transporte da semana para ir à faculdade.", opcoes: [{ texto: "Falta a semana inteira e perde as matérias.", resultado: "O problema financeiro vira um problema acadêmico grave.", impacto: -3 },{ texto: "Pede ajuda a um colega ou familiar.", resultado: "É difícil, mas você resolve o problema pontual.", impacto: +2 },{ texto: "Procura a assistência estudantil da faculdade.", resultado: "Você descobre que existem auxílios que podem te ajudar.", impacto: +3 }] },
    { situacao: "Você está quase se formando, mas não sabe qual área seguir dentro da sua profissão.", opcoes: [{ texto: "Trava e não faz nada, esperando uma 'luz'.", resultado: "A ansiedade da formatura aumenta e você não explora.", impacto: -2 },{ texto: "Se inscreve no primeiro concurso que aparece.", resultado: "Pode ser uma boa, mas talvez não seja o que você gosta.", impacto: 0 },{ texto: "Busca estágios curtos em áreas diferentes.", resultado: "Você experimenta na prática e descobre o que gosta.", impacto: +3 }] },
    { situacao: "Você acordou cansado e pensa em faltar à aula importante de hoje.", opcoes: [{ texto: "Fica em casa e dorme mais um pouco.", resultado: "Você perde o conteúdo e se sente culpado no fim do dia.", impacto: -2 },{ texto: "Vai para a aula mesmo cansado.", resultado: "Você entende o conteúdo e se sente produtivo por ter vencido a preguiça.", impacto: +3 },{ texto: "Assiste a aula online depois (se houver).", resultado: "Você aprende, mas com menor aproveitamento e sem tirar dúvidas.", impacto: +1 }] }
];

let phase5Plan = {};
let phase5Score = 0;
const phase5Questions = [
    { id: 'profissao', label: 'Qual é a sua profissão dos sonhos?', type: 'text' },
    { id: 'motivo', label: 'Por que você escolheu essa profissão?', type: 'textarea' },
    { id: 'metas', label: 'Quais são suas principais metas de vida?', type: 'textarea' },
    { id: 'acoes', label: 'Que ações você pode começar a fazer agora para alcançar seus objetivos?', type: 'textarea' },
    { id: 'valores', label: 'Quais valores pessoais são mais importantes para você?', type: 'text' },
    { id: 'desafios', label: 'Como você pretende lidar com os desafios que surgirem no caminho?', type: 'textarea' },
    { id: 'visao5anos', label: 'Onde você se imagina em 5 anos?', type: 'text' },
    { id: 'motivacao', label: 'O que te motiva a continuar estudando e evoluindo?', type: 'textarea' },
    { id: 'impacto', label: 'Que tipo de impacto você quer causar no mundo com sua profissão?', type: 'textarea' },
    { id: 'habilidades', label: 'Quais habilidades você acha que precisa desenvolver para chegar lá?', type: 'text' }
];

window.goBackToSetup = function() {
    if (setupScreen) setupScreen.style.display = 'block';
    if (gameScreen) gameScreen.style.display = 'none';
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) gameContainer.style.maxWidth = "650px";
    
    localStorage.removeItem('missionFuture_phase5Plan');
    localStorage.removeItem('missionFuture_score');
    localStorage.removeItem('missionFuture_profile');
    localStorage.removeItem('missionFuture_unlockedCards');
    localStorage.removeItem('missionFuture_ranking');
};

window.selectArea = function (characterKey) {
    selectedCharacterKey = characterKey;
    selectedCharacterColor = '';
    if (errorMessage) errorMessage.textContent = '';

    if (characterCards) {
        characterCards.forEach(card => {
            card.classList.remove('selected-card');
            if (card.dataset.character === characterKey) card.classList.add('selected-card');
        });
    }

    document.querySelectorAll('.character-card img').forEach(img => img.style.backgroundColor = defaultBolinhaColor);
    if (colorSwatches) {
        colorSwatches.forEach(swatch => swatch.classList.remove('selected-color'));
    }

    updateCharacterPreview();
    checkAndEnableStartButton();
};

window.selectCharacterAndColor = function (characterKey, color, event) {
    if (event) event.stopPropagation();

    if (characterCards) {
        characterCards.forEach(card => {
            card.classList.remove('selected-card');
            if (card.dataset.character === characterKey) card.classList.add('selected-card');
        });
    }

    selectedCharacterKey = characterKey;
    selectedCharacterColor = color;
    if (errorMessage) errorMessage.textContent = '';

    document.querySelectorAll('.character-card img').forEach(img => img.style.backgroundColor = defaultBolinhaColor);

    const selectedCard = document.querySelector(`.character-card[data-character="${characterKey}"]`);
    if (selectedCard && colorMap[color]) {
        selectedCard.querySelector('img').style.backgroundColor = colorMap[color];
    }

    if (colorSwatches) {
        colorSwatches.forEach(swatch => {
            swatch.classList.remove('selected-color');
            if (swatch.dataset.color === color && swatch.closest('.character-card').dataset.character === characterKey)
                swatch.classList.add('selected-color');
        });
    }

    updateCharacterPreview();
    checkAndEnableStartButton();
};

function updateCharacterPreview() {
    if (!previewImage || !previewText || !previewColorOverlay) return;

    const areaImagem = selectedCharacterKey ? `placeholder_${selectedCharacterKey}.png` : 'default_preview.png';
    const img = new Image();
    img.onload = () => { if (previewImage) previewImage.src = areaImagem; };
    img.onerror = () => { if (previewImage) previewImage.src = 'default_preview.png'; };
    img.src = areaImagem;


    if (selectedCharacterKey && selectedCharacterColor) {
        const areaNome = characterNamesMap[selectedCharacterKey];
        const corNome = colorNameMap[selectedCharacterColor];
        previewText.textContent = `Área: ${areaNome} | Cor: ${corNome}`;
    } else if (selectedCharacterKey) {
        const areaNome = characterNamesMap[selectedCharacterKey];
        previewText.textContent = `Área: ${areaNome} | Selecione a Cor!`;
    } else {
        previewText.textContent = 'Selecione uma área e cor para visualizar.';
    }

    previewColorOverlay.style.display = 'none';
    if (selectedCharacterColor && colorMap[selectedCharacterColor]) {
        previewColorOverlay.style.display = 'block';
        previewColorOverlay.style.backgroundColor = colorMap[selectedCharacterColor];
    }
}

function checkAndEnableStartButton() {
    if (!nameInput || !startGameButton) return;

    playerName = nameInput.value.trim();
    startGameButton.disabled = !(playerName.length > 2 && selectedCharacterKey && selectedCharacterColor);
}

function startGame() {
    playerName = nameInput.value.trim();

    if (!playerName || !selectedCharacterKey || !selectedCharacterColor) {
        if (errorMessage) errorMessage.textContent = 'Por favor, informe seu nome (mín. 3 letras), selecione a área E a cor.';
        return;
    }

    localStorage.setItem('missionFuture_name', playerName);
    localStorage.setItem('missionFuture_area', selectedCharacterKey);
    localStorage.setItem('missionFuture_color', selectedCharacterColor);
    localStorage.setItem('missionFuture_unlockedCards', JSON.stringify([]));
    localStorage.setItem('missionFuture_score', '0');
    localStorage.removeItem('missionFuture_phase5Plan');
    localStorage.removeItem('missionFuture_ranking');

    if (setupScreen) setupScreen.style.display = 'none';
    if (gameScreen) gameScreen.style.display = 'block';

    loadPhase1();
}

function loadPhase1() {
    playerScores = { "Analítico": 0, "Criativo": 0, "Cuidadoso": 0, "Prático": 0 };
    quizAnswers = {};

    const storedName = localStorage.getItem('missionFuture_name') || playerName;
    const storedArea = localStorage.getItem('missionFuture_area') || selectedCharacterKey;
    const storedColor = localStorage.getItem('missionFuture_color') || selectedCharacterColor;

    const areaNome = characterNamesMap[storedArea] || 'Área';
    const corNome = colorNameMap[storedColor] || 'Cor';

    if (gameScreen) {
        gameScreen.innerHTML = `
            <button onclick="goBackToSetup()" class="back-button">Voltar</button>
            <h2>Fase 1: Quem Sou Eu? – Autoconhecimento</h2>
            <p>Olá, ${storedName}. ${areaNome} (${corNome}).</p>
            <p>Esta fase irá revelar seu "Perfil de Jogador". Selecione a opção que mais te representa.</p>

            <div id="reflection-bonus" style="margin-top: 20px; padding: 10px; border: 1px dashed #30363d; border-radius: 5px; text-align: left;">
                <h4 style="color: #58a6ff;">BÔNUS: Reflexão Diária (+5 Pontos)</h4>
                <p>Em uma frase, o que você mais gosta de fazer no seu dia a dia?</p>
                <input type="text" id="daily-reflection" placeholder="Ex: Caminhar, Cozinhar, Tocar violão..." style="width: 95%; padding: 8px; border-radius: 4px; border: 1px solid #58a6ff; background-color: #0d1117; color: #c9d1d9;">
            </div>

            <div id="phase-1-quiz"></div>
            <button id="submit-quiz-button" class="action-button submit-button" style="display: none;">Ver Meu Perfil de Jogador</button>
            <div id="phase-1-result" style="display: none;"></div>
        `;

        const submitButton = document.getElementById('submit-quiz-button');
        if (submitButton) {
            submitButton.onclick = calculatePhase1Results;
        }

        renderPhase1Questions();
    }
}

function renderPhase1Questions() {
    const quizContainer = document.getElementById('phase-1-quiz');
    if (!quizContainer) return;

    let allQuestionsHTML = '';
    quizQuestions.forEach((q, index) => {
        let html = `<div class="question-block" data-question-index="${index}"><h4>${q.question}</h4>`;
        q.answers.forEach((a, i) => {
            const radioId = `q${index}-a${i}`;
            html += `
                <div data-clickable style="margin-top: 10px; cursor: pointer;" onmouseover="this.style.backgroundColor='#21262d'" onmouseout="this.style.backgroundColor='transparent'">
                    <input type="radio" id="${radioId}" name="question-${index}" value="${a.profile}" onclick="recordPhase1Answer(${index}, '${a.profile}')" required>
                    <label for="${radioId}" style="margin-left: 5px; cursor: pointer;">${a.text}</label>
                </div>`;
        });
        html += `</div>`;
        allQuestionsHTML += html;
    });
    quizContainer.innerHTML = allQuestionsHTML;
}

window.recordPhase1Answer = function(questionIndex, profile) {
    quizAnswers[questionIndex] = profile;
    const allAnswered = quizQuestions.every((_, index) => quizAnswers.hasOwnProperty(index));
    const submitQuizButton = document.getElementById('submit-quiz-button');
    if (submitQuizButton) {
        submitQuizButton.style.display = allAnswered ? 'block' : 'none';
    }
};

function calculatePhase1Results() {
    playerScores = { "Analítico": 0, "Criativo": 0, "Cuidadoso": 0, "Prático": 0 };
    Object.values(quizAnswers).forEach(profile => {
        if(playerScores.hasOwnProperty(profile)) {
            playerScores[profile] += 1;
        }
    });

    const reflectionInput = document.getElementById('daily-reflection');
    const reflectionText = reflectionInput ? reflectionInput.value.trim() : "";
    let bonusPoints = (reflectionText.length > 5) ? 5 : 0;
    let reflectionMessage = bonusPoints > 0 ?
        `Ótima reflexão! (+${bonusPoints} pontos de bônus)` :
        "Reflexão diária pulada. (0 pontos de bônus)";

    let maxScore = 0;
    let dominantProfiles = ["Indefinido"];
    Object.keys(playerScores).forEach(p => {
        if (playerScores[p] > maxScore) {
            maxScore = playerScores[p];
            dominantProfiles = [p];
        } else if (playerScores[p] === maxScore && maxScore > 0) {
source: 
            dominantProfiles.push(p);
        }
    });

    const finalProfileName = dominantProfiles.join(' e ');
    const totalScore = maxScore + bonusPoints;

    localStorage.setItem('missionFuture_profile', finalProfileName);
    localStorage.setItem('missionFuture_score', totalScore.toString()); 

    const quizContainer = document.getElementById('phase-1-quiz');
    const submitButton = document.getElementById('submit-quiz-button');
    const reflectionBox = document.getElementById('reflection-bonus');
    if (quizContainer) quizContainer.style.display = 'none';
    if (submitButton) submitButton.style.display = 'none';
    if (reflectionBox) reflectionBox.style.display = 'none';

    const resultContainer = document.getElementById('phase-1-result');
    if (resultContainer) {
        resultContainer.innerHTML = `
            <div>
                <h3>✅ Seu Perfil de Jogador é: <span style="color: #3fb950;">${finalProfileName.toUpperCase()}</span>!</h3>
                <p>Pontuação de Perfil: ${maxScore} pontos.</p>
                <p style="font-style: italic; color: #58a6ff;">${reflectionMessage}</p>
                <p>Pontuação Total da Fase: <strong style="color: #3fb950;">${totalScore} pontos</strong>.</p>
            </div>
            <button id="continue-phase-2" class="action-button next-phase-button">Continuar para a Fase 2</button>
        `;
        resultContainer.style.display = 'block';

        const continueButton = document.getElementById('continue-phase-2');
        if (continueButton) {
            continueButton.addEventListener('click', loadPhase2);
        }
    }
}

function loadPhase2() {
    phase2CurrentQuestionIndex = 0;
    unlockedCards = JSON.parse(localStorage.getItem('missionFuture_unlockedCards') || '[]');

    const gameContainer = document.getElementById('game-container');
    if (gameContainer) gameContainer.style.maxWidth = "800px";

    if (gameScreen) {
        gameScreen.innerHTML = `
            <button onclick="goBackToSetup()" class="back-button">Voltar ao Início</button>
            <h2>Fase 2: Explorando o Mundo das Profissões</h2>
            <p>Vamos testar seus conhecimentos! Responda corretamente para desbloquear "Cartas de Curso" e adicioná-las à sua galeria.</p>

            <div id="phase-2-quiz"></div>
            <div id="phase-2-feedback" class="feedback-box" style="display:none;"></div>

            <h3 id="card-gallery-title">Sua Galeria de Cartas</h3>
            <div id="phase-2-card-gallery"></div>
        `;

        renderPhase2Question();
        renderCardGallery(); 
    }
}

function renderPhase2Question() {
    const quizContainer = document.getElementById('phase-2-quiz');
    if (!quizContainer) return;

    if (phase2CurrentQuestionIndex >= phase2Questions.length) {
        quizContainer.innerHTML = `<h4>Parabéns! Você completou todos os desafios de trivia desta fase.</h4>`;
        const feedbackContainer = document.getElementById('phase-2-feedback');
        if (feedbackContainer) feedbackContainer.style.display = 'none';

        quizContainer.innerHTML += `<button class="action-button next-phase-button" style="margin-top: 20px;" onclick="loadPhase3()">Continuar para a Fase 3</button>`;
        return;
    }

    const q = phase2Questions[phase2CurrentQuestionIndex];
    let answersHTML = '';

    for (const key in q.answers) {
        answersHTML += `<button class="answer-button" onclick="checkPhase2Answer('${key}')">${key.toUpperCase()}: ${q.answers[key]}</button>`;
    }

    quizContainer.innerHTML = `
        <div id="phase-2-question-text">${q.question}</div>
        <div id="phase-2-answers">${answersHTML}</div>
    `;

    const feedbackContainer = document.getElementById('phase-2-feedback');
    if (feedbackContainer) feedbackContainer.style.display = 'none'; 
}

window.checkPhase2Answer = function(selectedKey) {
    const q = phase2Questions[phase2CurrentQuestionIndex];
    const feedbackContainer = document.getElementById('phase-2-feedback');
    if (!feedbackContainer) return;

    const isCorrect = (selectedKey === q.correctAnswer);
    let feedbackHTML = '';

    if (isCorrect) {
        feedbackContainer.className = 'feedback-box correct'; 
        feedbackHTML = `<h4>✅ Correto!</h4>`;
        if (unlockCard(q.cardToUnlock)) {
            const card = professionCardsDatabase[q.cardToUnlock];
            feedbackHTML += `<p>Você desbloqueou a carta: <strong>${card.title}</strong>!</p>`;
        } else {
            feedbackHTML += `<p>Você já possui esta carta na sua galeria.</p>`;
        }
    } else {
        feedbackContainer.className = 'feedback-box incorrect';
        const correctText = q.answers[q.correctAnswer];
        feedbackHTML = `<h4>❌ Incorreto.</h4><p>A resposta correta era: <strong>${q.correctAnswer.toUpperCase()}: ${correctText}</strong>.</p>`;
S   }

    feedbackHTML += `<button class="next-phase-button action-button" style="width: auto; padding: 10px 20px; margin-top: 10px;" onclick="nextPhase2Question()">Próxima Pergunta</button>`;
    feedbackContainer.innerHTML = feedbackHTML;
    feedbackContainer.style.display = 'block';

    document.querySelectorAll('.answer-button').forEach(button => button.disabled = true);
    renderCardGallery(isCorrect ? q.cardToUnlock : null);
};

window.nextPhase2Question = function() {
    phase2CurrentQuestionIndex++;
    renderPhase2Question();
};

function unlockCard(cardId) {
    if (professionCardsDatabase[cardId] && !unlockedCards.includes(cardId)) {
        unlockedCards.push(cardId);
        localStorage.setItem('missionFuture_unlockedCards', JSON.stringify(unlockedCards));
        return true;
    }
    return false;
}

function renderCardGallery(newCardId = null) {
    const galleryContainer = document.getElementById('phase-2-card-gallery');
    if (!galleryContainer) return;

    galleryContainer.style.display = 'flex';
    galleryContainer.style.flexWrap = 'wrap'; 	
    galleryContainer.style.justifyContent = 'center'; 
    galleryContainer.style.gap = '15px'; 			
    galleryContainer.style.padding = '10px 0'; 		

    unlockedCards = JSON.parse(localStorage.getItem('missionFuture_unlockedCards') || '[]');

    if (unlockedCards.length === 0) {
        galleryContainer.innerHTML = `<p>Você ainda não desbloqueou nenhuma carta de curso. Responda o quiz!</p>`;
     	return;
    }

    galleryContainer.innerHTML = ''; 

    unlockedCards.forEach(cardId => {
        const cardData = professionCardsDatabase[cardId];
        if (cardData) {
            const newClass = (cardId === newCardId) ? 'new-unlock' : '';
            
          	galleryContainer.innerHTML += `
                <div class="profession-card ${newClass}">
                    <h4>${cardData.title}</h4>
                    <p><strong>O que faz:</strong> ${cardData.description}</p>
                    <p><strong>Curso:</strong> ${cardData.course}</p>
                    <p><strong>Salário Médio:</strong> ${cardData.salary}</p>
S               	<p><strong>Rotina:</strong> ${cardData.routine}</p>
                </div>
            `;
        }
    });
}

function loadPhase3() {
    phase3SelectedProfession = null;
    phase3CurrentStepIndex = 0;
    phase3Score = 0;

    const gameContainer = document.getElementById('game-container');
    if (gameContainer) gameContainer.style.maxWidth = "700px";

    if (gameScreen) {
        let professionOptionsHTML = '';

        const availablePaths = Object.keys(professionPaths);

        if (availablePaths.length > 0) {
            professionOptionsHTML = availablePaths.map(cardId => {
                const card = professionCardsDatabase[cardId]; 
                if (!card) {
                    console.warn(`Dados da profissão '${cardId}' não encontrados em 'professionCardsDatabase'.`);
                    return ''; 
                }
                const radioId = `prof-${cardId}`;
                return `<div class="profession-choice"><input type="radio" id="${radioId}" name="phase3-profession" value="${cardId}" onclick="window.selectProfessionForPhase3('${cardId}')"><label for="${radioId}">${card.title}</label></div>`;
s         	}).join('');
        
        } else {
            professionOptionsHTML = "<p>Nenhuma profissão encontrada para esta fase.</p>";
        }

        gameScreen.innerHTML = `
            <button onclick="goBackToSetup()" class="back-button">Voltar ao Início</button>
            <h2>Fase 3: Caminho da Escolha</h2>
            <p>Escolha um curso abaixo para planejar os próximos passos!</p>

            <div id="phase-3-profession-selection">
                <span class="profession-select-label">Escolha o Curso:</span>
                ${professionOptionsHTML}
            </div>

            <div id="phase-3-step-quiz" style="display: none;"></div>
            <div id="phase-3-feedback" class="feedback-box" style="display: none;"></div>
            <div id="phase-3-summary" style="display: none;"></div>
        `;
    }
}

window.selectProfessionForPhase3 = function(professionId) {
    phase3SelectedProfession = professionId;
    phase3CurrentStepIndex = 0;
    phase3Score = 0;
    
    const selectionContainer = document.getElementById('phase-3-profession-selection');
    const quizContainer = document.getElementById('phase-3-step-quiz');
    
    if (selectionContainer) selectionContainer.style.display = 'none';
    if (quizContainer) quizContainer.style.display = 'block';
    
    renderPhase3Step();
}

function renderPhase3Step() {
    const quizContainer = document.getElementById('phase-3-step-quiz');
    const feedbackContainer = document.getElementById('phase-3-feedback');
    if (!quizContainer || !feedbackContainer || !phase3SelectedProfession || !professionPaths[phase3SelectedProfession]) {
        console.error("Erro ao renderizar passo da Fase 3: Container ou profissão não encontrados.");
        if(gameScreen) gameScreen.innerHTML += "<p style='color:red;'>Erro ao carregar os passos. Tente voltar e selecionar a profissão novamente.</p>";
        return;
    }

    feedbackContainer.style.display = 'none';

    const path = professionPaths[phase3SelectedProfession];

    if (phase3CurrentStepIndex >= path.length) {
        showPhase3Summary();
        return;
    }

    const step = path[phase3CurrentStepIndex];
    if (!step || !step.question || !Array.isArray(step.options)) {
        console.error(`Erro: Dados inválidos para o passo ${phase3CurrentStepIndex} da profissão ${phase3SelectedProfession}.`);
        if(gameScreen) gameScreen.innerHTML += `<p style='color:red;'>Erro nos dados do passo ${phase3CurrentStepIndex + 1}. Pulando para o sumário.</p>`;
        showPhase3Summary();
        return;
    }

    let optionsHTML = '';
    step.options.forEach((optionText, index) => {
        optionsHTML += `<button class="step-option-button" onclick="window.checkPhase3Answer(${index})">${optionText}</button>`;
    });

    quizContainer.innerHTML = `
        <div id="phase-3-step-question">Passo ${phase3CurrentStepIndex + 1} para ${professionCardsDatabase[phase3SelectedProfession]?.title || 'Curso'}: ${step.question}</div>
        <div id="phase-3-step-options">${optionsHTML}</div>
    `;
}

window.checkPhase3Answer = function(choiceIndex) {
    const path = professionPaths[phase3SelectedProfession];
    if (!path) return;
    const step = path[phase3CurrentStepIndex];
    const feedbackContainer = document.getElementById('phase-3-feedback');
    if (!feedbackContainer) return;

    if (typeof step.correctAnswer !== 'number') {
        console.error(`Erro: Resposta correta não definida para o passo ${phase3CurrentStepIndex} de ${phase3SelectedProfession}.`);
        feedbackContainer.innerHTML = "<p style='color:orange;'>Erro nos dados da pergunta. Avançando...</p>";
        feedbackContainer.className = 'feedback-box'; 
        feedbackContainer.style.display = 'block';
        feedbackContainer.innerHTML += `<button class="next-phase-button action-button" style="width: auto; padding: 10px 20px; margin-top: 10px;" onclick="window.nextPhase3Step()">Próximo</button>`;
        document.querySelectorAll('.step-option-button').forEach(button => button.disabled = true);
        return;
    }

    const isCorrect = (choiceIndex === step.correctAnswer);
   let feedbackHTML = '';

    if (isCorrect) {
        phase3Score += 10;
        feedbackContainer.className = 'feedback-box correct';
        feedbackHTML = `<h4>✅ Correto!</h4><p>Bom planejamento! Você ganhou 10 pontos.</p>`;
    } else {
        feedbackContainer.className = 'feedback-box incorrect';
        const correctText = step.options[step.correctAnswer];
Source: 
        feedbackHTML = `<h4>❌ Ops!</h4><p>Um passo mais realista seria: <strong>${correctText}</strong>.</p>`;
    }

    feedbackHTML += `<button class="next-phase-button action-button" style="width: auto; padding: 10px 20px; margin-top: 10px;" onclick="window.nextPhase3Step()">Próximo Passo</button>`;
    feedbackContainer.innerHTML = feedbackHTML;
    feedbackContainer.style.display = 'block';

    document.querySelectorAll('.step-option-button').forEach(button => button.disabled = true);
};

window.nextPhase3Step = function() {
    phase3CurrentStepIndex++;
    renderPhase3Step();
};

function showPhase3Summary() {
    const quizContainer = document.getElementById('phase-3-step-quiz');
    const feedbackContainer = document.getElementById('phase-3-feedback');
    const summaryContainer = document.getElementById('phase-3-summary');
    if (!quizContainer || !feedbackContainer || !summaryContainer) return;

    quizContainer.style.display = 'none';
    feedbackContainer.style.display = 'none';

    const professionTitle = professionCardsDatabase[phase3SelectedProfession]?.title || 'Curso Escolhido';

    summaryContainer.innerHTML = `
        <h3>Fase 3 Concluída: Planejando ${professionTitle}</h3>
        <p>Você traçou um caminho para o curso escolhido!</p>
        <p>Sua Pontuação nesta Fase: <strong style="color: #3fb950;">${phase3Score} pontos</strong>.</p>
        <p>Lembre-se: o caminho real pode ter desvios, mas um bom plano é o primeiro passo!</p>
        <button class="action-button next-phase-button" style="margin-top: 20px;" onclick="loadPhase4()">Continuar para a Fase 4</button>
    `;
    summaryContainer.style.display = 'block';

    let currentTotalScore = parseInt(localStorage.getItem('missionFuture_score') || '0');
    localStorage.setItem('missionFuture_score', (currentTotalScore + phase3Score).toString());
}

function loadPhase4() {
    phase4CurrentScenarioIndex = 0;
    phase4MotivationScore = 0;

    const gameContainer = document.getElementById('game-container');
    if (gameContainer) gameContainer.style.maxWidth = "700px"; 

    if (gameScreen) {
        gameScreen.innerHTML = `
            <button onclick="goBackToSetup()" class="back-button">Voltar ao Início</button>
            <h2>Fase 4: Desafio da Motivação</h2>
            <p>Sua jornada não é feita só de estudos, mas de atitudes. Como você reage aos desafios do dia a dia?</p>

s       	<div id="phase-4-scenario"></div>
          	<div id="phase-4-options"></div>
          	<div id="phase-4-feedback" class="feedback-box" style="display: none;"></div>
          	<div id="phase-4-summary" style="display: none;"></div>
        `;
        renderPhase4Scenario();
    }
}

function renderPhase4Scenario() {
    const scenarioContainer = document.getElementById('phase-4-scenario');
    const optionsContainer = document.getElementById('phase-4-options');
    const feedbackContainer = document.getElementById('phase-4-feedback');

    if (!scenarioContainer || !optionsContainer) return;

    if (feedbackContainer) feedbackContainer.style.display = 'none';

    if (phase4CurrentScenarioIndex >= phase4Scenarios.length) {
        showPhase4Summary();
        return;
    }

    const scenario = phase4Scenarios[phase4CurrentScenarioIndex];
    
    scenarioContainer.innerHTML = `<p id="phase-4-scenario-text">${scenario.situacao}</p>`;
    
    let optionsHTML = '';
    scenario.opcoes.forEach((option, index) => {
        optionsHTML += `<button class="choice-button" onclick="checkPhase4Answer(${index})">${option.texto}</button>`;
    });
    optionsContainer.innerHTML = optionsHTML;
}

window.checkPhase4Answer = function(optionIndex) {
    const scenario = phase4Scenarios[phase4CurrentScenarioIndex];
    const option = scenario.opcoes[optionIndex];
    const feedbackContainer = document.getElementById('phase-4-feedback');
    if (!feedbackContainer) return;

    phase4MotivationScore += option.impacto;

    let feedbackClass = 'neutral';
    let feedbackIcon = '🤔';
    if (option.impacto > 0) {
        feedbackClass = 'positive'; 
        feedbackIcon = '✅';
    } else if (option.impacto < 0) {
        feedbackClass = 'negative'; 
        feedbackIcon = '❌';
    }

    feedbackContainer.className = `feedback-box ${feedbackClass}`;
    feedbackContainer.innerHTML = `
        <h4>${feedbackIcon} Resultado da sua escolha:</h4>
        <p>${option.resultado}</p>
        <p><strong>Impacto na Motivação: ${option.impacto > 0 ? '+' : ''}${option.impacto}</strong></p>
        <button class="next-phase-button action-button" style="width: auto; padding: 10px 20px; margin-top: 10px;" onclick="nextPhase4Scenario()">Próxima Situação</button>
    `;
    feedbackContainer.style.display = 'block';

    document.querySelectorAll('.choice-button').forEach(button => button.disabled = true);
}

window.nextPhase4Scenario = function() {
    phase4CurrentScenarioIndex++;
    renderPhase4Scenario();
}

function showPhase4Summary() {
    const scenarioContainer = document.getElementById('phase-4-scenario');
    const optionsContainer = document.getElementById('phase-4-options');
    const feedbackContainer = document.getElementById('phase-4-feedback');
    const summaryContainer = document.getElementById('phase-4-summary');
    if (!summaryContainer) return;

    if (scenarioContainer) scenarioContainer.style.display = 'none';
    if (optionsContainer) optionsContainer.style.display = 'none';
    if (feedbackContainer) feedbackContainer.style.display = 'none';

    let finalMessage = '';
    let messageColor = '';

    if (phase4MotivationScore >= 20) {
        finalMessage = "<strong>Alta Motivação:</strong> Você está no caminho certo, com uma mentalidade forte para superar desafios. Continue assim!";
   	messageColor = "#c79f76";
    } else if (phase4MotivationScore > 5) {
        finalMessage = "<strong>Média Motivação:</strong> Você tem potencial e boas atitudes, mas às vezes se deixa abalar. Tente se organizar e focar no seu bem-estar!";
        messageColor = "#83e6fb";
    } else {
        finalMessage = "<strong>Baixa Motivação:</strong> A jornada parece difícil agora, mas não desista! Pequenas mudanças de atitude podem fazer uma grande diferença. Peça ajuda se precisar!";
        messageColor = "#cc243f";
    }

    summaryContainer.innerHTML = `
        <h3>Fase 4 Concluída: Desafio da Motivação</h3>
        <p>Você enfrentou 10 desafios do dia a dia!</p>
        <p>Sua Pontuação de Motivação: <strong style="color: ${messageColor}; font-size: 1.2em;">${phase4MotivationScore} pontos</strong>.</p>
        <div style="padding: 15px; border: 1px solid ${messageColor}; border-radius: 5px; background-color: #231c1d; margin-top: 15px;">
            <p style="color: ${messageColor}; margin: 0;">${finalMessage}</p>
        </div>
        
        <p style="margin-top: 20px;"><strong>Você chegou à etapa final!</strong></p>
        <button class="action-button next-phase-button" style="margin-top: 20px;" onclick="loadPhase5()">Continuar para a Fase 5: Projeto de Vida</button>
    `;
    summaryContainer.style.display = 'block';

    let currentTotalScore = parseInt(localStorage.getItem('missionFuture_score') || '0');
    localStorage.setItem('missionFuture_score', (currentTotalScore + phase4MotivationScore).toString());
}

function loadPhase5() {
    phase5Score = 0;
    phase5Plan = JSON.parse(localStorage.getItem('missionFuture_phase5Plan') || '{}');

    const gameContainer = document.getElementById('game-container');
    if (gameContainer) gameContainer.style.maxWidth = "800px"; 

    if (gameScreen) {
        gameScreen.innerHTML = `
            <button onclick="goBackToSetup()" class="back-button">Voltar ao Início</button>
            <h2>Fase 5: Meu Projeto de Vida</h2>
            <p>Esta é a fase final! Responda às perguntas abaixo para construir seu "Plano Futuro".</p>
            <p>(Suas respostas são salvas automaticamente. Quanto mais completo, maior a pontuação!)</p>
            
            <div id="phase-5-form"></div>
            <div id="phase-5-summary" style="display: none;"></div>
            
            <div id="ranking-section" style="display: none; margin-top: 30px; border-top: 1px solid #c79f76; padding-top: 20px;"></div>
        `;
        renderPhase5Questions();
    }
}

function renderPhase5Questions() {
    const formContainer = document.getElementById('phase-5-form');
    if (!formContainer) return;

    let formHTML = '';
    phase5Questions.forEach(q => {
        const savedValue = phase5Plan[q.id] || '';
        formHTML += `<div class="phase-5-question-group">
                        <label for="q-${q.id}">${q.label}</label>`;
        if (q.type === 'textarea') {
            formHTML += `<textarea id="q-${q.id}" data-id="${q.id}" oninput="savePhase5Answers()">${savedValue}</textarea>`;
        } else {
            formHTML += `<input type="text" id="q-${q.id}" data-id="${q.id}" value="${savedValue}" oninput="savePhase5Answers()">`;
        }
        formHTML += `</div>`;
    });
    formHTML += `<button class="action-button submit-button" style="margin-top: 20px;" onclick="calculatePhase5Score()">Finalizar Projeto e Ver Ranking</button>`;
    formContainer.innerHTML = formHTML;
}

window.savePhase5Answers = function() {
    const inputs = document.querySelectorAll('#phase-5-form [data-id]');
    let currentPlan = {};
    inputs.forEach(input => {
        currentPlan[input.dataset.id] = input.value;
    });
    phase5Plan = currentPlan;
    localStorage.setItem('missionFuture_phase5Plan', JSON.stringify(phase5Plan));
}

window.calculatePhase5Score = function() {
    phase5Score = 0;
    const inputs = document.querySelectorAll('#phase-5-form [data-id]');
    inputs.forEach(input => {
        const value = input.value.trim();
        if (value.length > 20) { phase5Score += 2; }
        else if (value.length > 5) { phase5Score += 1; }
    });
    
    let currentTotalScore = parseInt(localStorage.getItem('missionFuture_score') || '0');
    localStorage.setItem('missionFuture_score', (currentTotalScore + phase5Score).toString());

    saveScoreToLocalRanking(); 
    
    showPhase5Summary();
}

function showPhase5Summary() {
    const formContainer = document.getElementById('phase-5-form');
    const summaryContainer = document.getElementById('phase-5-summary');
    const rankingContainer = document.getElementById('ranking-section'); 
    
    if (formContainer) formContainer.style.display = 'none';
    if (!summaryContainer || !rankingContainer) return;

    let finalMessage = '';
    let messageColor = '';

    if (phase5Score >= 16) {
        finalMessage = "Excelente! Seu projeto de vida está bem definido e inspirador!";
        messageColor = "#c79f76";
    } else if (phase5Score >= 10) {
        finalMessage = "Muito bom! Você já tem um bom plano, continue aprimorando.";
source: 
      	messageColor = "#83e6fb";
    } else {
        finalMessage = "Bom começo! Pense mais sobre seus objetivos e sonhos.";
        messageColor = "#cc243f";
    }

    summaryContainer.innerHTML = `
        <h3>Fase 5 Concluída: Meu Projeto de Vida</h3>
        <p>Pontuação do Projeto: <strong style="color: ${messageColor}; font-size: 1.2em;">${phase5Score} / 20</strong></p>
        <div style="padding: 15px; border: 1px solid ${messageColor}; border-radius: 5px; background-color: #231c1d; margin-top: 15px;">
            <p style="color: ${messageColor}; margin: 0;">${finalMessage}</p>
        </div>
        <p style="margin-top: 20px;"><strong>Parabéns! Você concluiu a Missão Futuro!</strong></p>
source: 
        <button class="action-button next-phase-button" style="margin-top: 10px;" onclick="generateCertificate()">Salvar/Imprimir Certificado</button>
        <button class="action-button" style="margin-top: 10px; background-color: #6e7681; border-color: #6e7681;" onclick="goBackToSetup()">Voltar ao Início</button>
    `;
    summaryContainer.style.display = 'block';

    rankingContainer.innerHTML = displayLocalRanking();
    rankingContainer.style.display = 'block'; 
}

// ==================================================================
// === INÍCIO DA ÁREA MODIFICADA: DESIGN DO CERTIFICADO ===
// ==================================================================

window.generateCertificate = function() {
    const playerName = localStorage.getItem('missionFuture_name') || 'Jogador(a)';
    const totalGameScore = localStorage.getItem('missionFuture_score') || '0';
    const phase5ScoreValue = phase5Score; 
    
    let feedbackMessage = '';
    if (phase5ScoreValue >= 16) feedbackMessage = "Projeto de Vida: Excelente";
    else if (phase5ScoreValue >= 10) feedbackMessage = "Projeto de Vida: Muito Bom";
    else feedbackMessage = "Projeto de Vida: Bom Começo";

    const today = new Date().toLocaleDateString('pt-BR');
    const planAnswers = JSON.parse(localStorage.getItem('missionFuture_phase5Plan') || '{}');

    // --- CSS ATUALIZADO ---
    const certificateStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap');
        
        body { 
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
            background-color: #0d1117; 
            margin: 0; 
            padding: 20px; 
            color: #c9d1d9;
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact;
        }
        .certificate-container { 
            max-width: 800px; 
            width: 90%;
            margin: 20px auto; 
            padding: 30px; 
            border: 2px solid #c79f76; 
            background-color: #161b22; 
            box-shadow: 0 0 25px rgba(199, 159, 118, 0.4); 
            border-radius: 8px;
            text-align: center;
        }
        h1 { 
            color: #c79f76; 
            text-align: center; 
            font-size: 2.2em; 
            margin-bottom: 10px; 
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        h2 { 
            color: #ffffff; 
            text-align: center; 
            font-size: 2.8em;
            margin: 20px 0 10px 0;
            text-shadow: 0 0 10px rgba(199, 159, 118, 0.7);
        }
        p { 
            font-size: 1.1em; 
            line-height: 1.7; 
            color: #c9d1d9;
        }
        .congrats-text {
            font-size: 1.2em;
            margin-bottom: 20px;
        }
        .score-section { 
            text-align: center; 
            margin: 25px 0; 
        }
        .score-section span { 
            display: inline-block; 
            padding: 12px 25px; 
            background-color: #c79f76; 
            color: #161b22; 
            font-weight: bold; 
            font-size: 1.3em; 
            border-radius: 5px; 
        }
        .feedback-message {
            font-style: italic;
            color: #83e6fb;
            font-size: 1.1em;
        }
        .plan-section { 
            margin-top: 30px; 
            text-align: left;
            border-top: 1px solid #30363d;
            padding-top: 20px;
        }
        .plan-section h3 { 
            color: #c79f76; 
            border-bottom: 1px solid #c79f76; 
            padding-bottom: 5px; 
            font-size: 1.4em;
        }
        .plan-section p { 
            font-size: 1em; 
            background-color: #0d1117; 
            color: #c9d1d9; 
            padding: 12px; 
            border-radius: 5px; 
            border: 1px solid #30363d;
            margin-bottom: 10px;
        }
        .plan-section p strong {
             color: #83e6fb;
             display: block;
             margin-bottom: 5px;
             font-size: 1.1em;
        }
        .footer { 
            text-align: right; 
            margin-top: 30px; 
            font-style: italic; 
            color: #6e7681;
        }
        
        @media (max-width: 600px) {
            .certificate-container { padding: 20px; width: 95%; }
            h1 { font-size: 1.8em; }
            h2 { font-size: 2.2em; }
            p { font-size: 1em; }
            .score-section span { font-size: 1.1em; padding: 10px 15px; }
            .plan-section p { padding: 10px; }
        }

        @media print { 
            body { background-color: #ffffff; color: #000000; }
            .certificate-container { 
                background-color: #ffffff; 
                color: #231c1d; 
                box-shadow: none; 
                border-width: 10px;
                border-color: #c79f76;
                width: 100%;
                max-width: 100%;
                margin: 0;
                padding: 10px;
            }
            h1, .plan-section h3 { color: #c79f76; }
            h2 { color: #000000; text-shadow: none; }
            p, .feedback-message { color: #231c1d; }
            .score-section span { background-color: #c79f76; color: #231c1d; }
            .plan-section p { background-color: #f4f4f4; border-color: #ddd; }
            .plan-section p strong { color: #0056b3; }
            .footer { color: #555; }
        }
    `;

    // --- HTML ATUALIZADO ---
    let certificateHTML = `
        <html><head><title>Certificado - Missão Futuro</title><style>${certificateStyles}</style></head><body>
        <div class="certificate-container">
            <h1>🚀 Missão Futuro</h1>
            <p class="congrats-text">Este certificado é concedido a:</p>
            
            <h2>${playerName}</h2>
            
            <p>Por completar a jornada de autoconhecimento e planejamento de carreira no jogo "Missão Futuro".</p>
            <p class="feedback-message"><i>${feedbackMessage} (Pontuação do Projeto: ${phase5ScoreValue}/20)</i></p>

            <div class="score-section">
                <span>Pontuação Total do Jogo: ${totalGameScore}</span>
            </div>

            <div class="plan-section">
                <h3>Resumo do Projeto de Vida:</h3>
                <p><strong>Profissão-alvo:</strong> ${planAnswers.profissao || 'Não preenchido'}</p>
                <p><strong>Motivo da escolha:</strong> ${planAnswers.motivo || 'Não preenchido'}</p>
                <p><strong>Metas principais:</strong> ${planAnswers.metas || 'Não preenchido'}</p>
                <p><strong>Ações imediatas:</strong> ${planAnswers.acoes || 'Não preenchido'}</p>
                <p><strong>Valores:</strong> ${planAnswers.valores || 'Não preenchido'}</p>
            </div>
            
            <div class="footer">
                <p>Concluído em: ${today}</p>
            </div>
        </div>
        <script>window.onload = function() { window.print(); }</script>
        </body></html>
    `;

    const certWindow = window.open('', '_blank');
    certWindow.document.write(certificateHTML);
    certWindow.document.close(); 
}

// ==================================================================
// === FIM DA ÁREA MODIFICADA ===
// ==================================================================


function saveScoreToLocalRanking() {
    const playerName = localStorage.getItem('missionFuture_name') || 'Jogador(a)';
    const totalGameScore = parseInt(localStorage.getItem('missionFuture_score') || '0');

    let ranking = JSON.parse(localStorage.getItem('missionFuture_ranking') || '[]');

    ranking.push({ name: playerName, score: totalGameScore });
    ranking.sort((a, b) => b.score - a.score);
    ranking = ranking.slice(0, MAX_RANKING_ENTRIES);

    localStorage.setItem('missionFuture_ranking', JSON.stringify(ranking));
}

function displayLocalRanking() {
    const ranking = JSON.parse(localStorage.getItem('missionFuture_ranking') || '[]');
    const currentPlayerName = localStorage.getItem('missionFuture_name') || 'Jogador(a)';
    const currentPlayerScore = parseInt(localStorage.getItem('missionFuture_score') || '0');

    if (ranking.length === 0) {
        return "<p>Ainda não há pontuações registradas. Seja o primeiro!</p>";
    }

    let rankingHTML = `
        <h3>🏆 Ranking Local (Top ${MAX_RANKING_ENTRIES}) 🏆</h3>
        <table id="ranking-table">
            <thead>
                <tr>
                    <th>🏅 Posição</th>
                    <th>🧍 Nome</th>
                    <th>⭐ Pontuação</th>
source: 
            	</tr>
            </thead>
            <tbody>
    `;

    let currentPlayerPosition = -1;

    ranking.forEach((entry, index) => {
        const isCurrentPlayer = (entry.name === currentPlayerName && entry.score === currentPlayerScore && currentPlayerPosition === -1);
        if (isCurrentPlayer) {
            currentPlayerPosition = index + 1; 
        }
        rankingHTML += `
            <tr class="${isCurrentPlayer ? 'current-player-highlight' : ''} ${index === 0 ? 'first-place-highlight' : ''}">
source: 
            	<td>${index + 1}º</td>
                <td>${entry.name}</td>
                <td>${entry.score}</td>
            </tr>
        `;
    });

    rankingHTML += `
            </tbody>
        </table>
    `;

    if (currentPlayerPosition !== -1) {
        rankingHTML += `<p class="current-player-rank-message">Sua Posição Atual: ${currentPlayerPosition}º lugar!</p>`;
    } else {
         rankingHTML += `<p class="current-player-rank-message">Sua pontuação não entrou no Top ${MAX_RANKING_ENTRIES} desta vez.</p>`;
    }

    return rankingHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    nameInput = document.getElementById('player-name');
    startGameButton = document.getElementById('start-game-button');
    errorMessage = document.getElementById('error-message');
    setupScreen = document.getElementById('setup-screen');
    gameScreen = document.getElementById('game-screen');
source: 
  	characterCards = document.querySelectorAll('.character-card');
  	colorSwatches = document.querySelectorAll('.color-swatch');
  	previewImage = document.getElementById('preview-image');
  	previewColorOverlay = document.getElementById('preview-color-overlay');
  	previewText = document.getElementById('preview-text');
  	
  	if (!nameInput || !startGameButton || !setupScreen || !gameScreen || !characterCards || !colorSwatches || !previewImage || !previewColorOverlay || !previewText) {
      	console.error("Erro Crítico: Elementos essenciais da UI não encontrados. Verifique o index.html.");
      	if(errorMessage) errorMessage.textContent = "Erro ao carregar o jogo. Verifique o console.";
      	return; 
  	}

  	nameInput.addEventListener('input', checkAndEnableStartButton);
  	startGameButton.addEventListener('click', startGame);

  	characterCards.forEach(card => {
      	const characterKey = card.dataset.character;
      	if (characterKey) {
          	card.addEventListener('click', () => {
             	selectArea(characterKey);
          	});
      	}
  	});

  	colorSwatches.forEach(swatch => {
      	const color = swatch.dataset.color;
      	const parentCard = swatch.closest('.character-card'); 
      	
      	if (color && parentCard) {
          	const characterKey = parentCard.dataset.character;
         	swatch.addEventListener('click', (event) => {
              	selectCharacterAndColor(characterKey, color, event);
          	});
      	}
  	});

  	checkAndEnableStartButton(); 
   updateCharacterPreview(); 
});