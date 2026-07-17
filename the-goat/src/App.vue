<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useGameEngine } from './composables/useGameEngine';
import { useDraft } from './composables/useDraft';
import { calculateGoatScore } from './utils/careerEvaluator';
import { compareCareer } from './utils/careerComparison';
import { calculateOverall } from './utils/statsCalculator';
import { calculateRetiredJerseys } from './utils/legacyCalculator';
import { findBestSeasonNumber } from './utils/seasonEvaluator';
import type { Difficulty, PlayerAttributes, Position } from './types';

type Locale = 'pt' | 'en' | 'es';
type Theme = 'light' | 'dark';

const messages = {
  pt: {
    appName: 'GOAT Simulator', tagline: 'Construa a carreira. Entre para a história.', howItWorks: 'Como funciona',
    heroTitle: 'Roube atributos de lendas. Viva uma carreira. Descubra se você é o GOAT.',
    playerName: 'Seu nome', namePlaceholder: 'Como o mundo vai chamar você?', nationality: 'Nacionalidade',
    position: 'Escolha sua posição', jersey: 'Número da camisa', difficulty: 'Dificuldade', amateur: 'Amador', pro: 'Pro',
    amateurDesc: 'Veja os números exatos das lendas. 1 nova tentativa às cegas.', proDesc: 'Números visíveis. Identidades ocultas. Sem novas tentativas.',
    startDraft: 'Começar draft', recentCareers: 'Suas carreiras recentes', filledSlots: 'Atributos preenchidos', blindReroll: 'Nova tentativa',
    noRerolls: 'Modo Pro: sem novas tentativas', mysteryPlayer: 'Jogador misterioso', identityHidden: 'Identidade oculta', era: 'Era',
    selected: 'Escolhido', yourPlayer: 'Seu jogador', withPick: 'Com a escolha', selects: 'seleciona', startingOvr: 'OVR inicial',
    signContract: 'Assinar contrato de calouro', age: 'Idade', morale: 'Moral do time', rookieSeason: 'Temporada de estreia',
    seasonStats: 'Números da temporada', playoffs: 'Playoffs', game: 'Jogo', result: 'Resultado', court: 'Quadra',
    simulateSeries: 'Simular série', simulateGame: 'Simular jogo', gameLocked: 'Modo por jogo ativo até o fim da série',
    playoffsComplete: 'Playoffs concluídos', continue: 'Continuar', careerEnded: 'Carreira encerrada', viewLegacy: 'Ver legado',
    transferWindow: 'Mercado de transferências', yearsOld: 'anos', contractExpired: 'Seu contrato terminou', listenOffers: 'Ouvir propostas',
    contract: 'Contrato', yearsLeft: 'anos restantes', simulateSeason: 'Simular temporada', simulateCareer: 'Simular carreira até o fim',
    preferredTeam: 'Time preferido', requestTrade: 'Pedir troca', retire: 'Anunciar aposentadoria', press: 'Imprensa',
    standings: 'Classificação', eastern: 'Leste', western: 'Oeste', seasonLeaders: 'Líderes da temporada',
    legacy: 'Legado', careerScore: 'Pontuação da carreira', careerTotals: 'Totais da carreira', points: 'Pontos', rebounds: 'Rebotes',
    assists: 'Assistências', games: 'Jogos', comparisons: 'Comparações históricas', careerPath: 'Caminho da carreira',
    trophyCabinet: 'Sala de troféus', records: 'Recordes e legado', yearByYear: 'Temporada por temporada', originalDna: 'DNA original',
    earnings: 'Ganhos na carreira', newCareer: 'Nova carreira', breakingNews: 'Última hora', season: 'Temporada', seasons: 'Temporadas',
    themeLight: 'Ativar modo claro', themeDark: 'Ativar modo escuro', language: 'Idioma', careerAverages: 'Médias da carreira',
    retiredJerseys: 'Camisas aposentadas', closestProfiles: 'Perfis históricos mais próximos', rings: 'Títulos', ring: 'Título', allTime: 'Ranking histórico da NBA',
    steals: 'Roubos', blocks: 'Tocos', mvpAwards: 'Prêmios de MVP', championships: 'Campeonatos', dpoyAwards: 'Prêmios de DPOY',
    awardsNotes: 'Prêmios e notas', rookieReady: 'O novato está pronto. O mundo está de olho.', playoffBegins: '{team} inicia sua campanha nos playoffs.',
    championNews: '{player} leva {team} ao título da NBA!', missesPlayoffs: 'Desastre! {team} fica fora dos playoffs.',
    eliminatedNews: '{team} foi eliminado em {round}.', historicScoring: '{player} teve uma temporada histórica com média de {ppg} PPG.',
    namedMvp: '{player} foi eleito MVP!', injuryNews: '{injury}: {games} jogos perdidos.',
    year: 'ano', years: 'anos', seasonSingular: 'temporada', seasonPlural: 'temporadas', stayAt: 'Permanecer no {team}', ageSuffix: 'anos',
    closestCareer: 'Carreira mais próxima', alternative: 'Alternativa #{number}', fullLegacy: 'Perfil completo de legado',
    statisticalProfile: 'Perfil estatístico', similar: 'Em comum', careerSnapshot: '{seasons} temporadas · {points} pontos · {rings} títulos',
    differenceMore: 'Mais {dimension} que {player}', differenceLess: 'Menos {dimension} que {player}', tableCaption: 'Estatísticas da carreira por temporada',
    yearShort: 'Ano', teamShort: 'Tm', ageShort: 'Id',
    confirmRetire: 'Tem certeza de que deseja encerrar sua carreira? Esta ação não pode ser desfeita.'
  },
  en: {
    appName: 'GOAT Simulator', tagline: 'Build the career. Enter the history books.', howItWorks: 'How it works',
    heroTitle: 'Steal attributes from legends. Live a career. Discover if you are the GOAT.',
    playerName: 'Your name', namePlaceholder: 'What will the world call you?', nationality: 'Nationality', position: 'Choose your position',
    jersey: 'Jersey number', difficulty: 'Difficulty', amateur: 'Amateur', pro: 'Pro',
    amateurDesc: "See legends' exact numbers. 1 blind reroll.", proDesc: 'Visible numbers. Hidden identities. No rerolls.',
    startDraft: 'Start draft', recentCareers: 'Your recent careers', filledSlots: 'Filled slots', blindReroll: 'Blind reroll',
    noRerolls: 'Pro mode: no rerolls', mysteryPlayer: 'Mystery player', identityHidden: 'Identity hidden', era: 'Era',
    selected: 'Selected', yourPlayer: 'Your player', withPick: 'With pick', selects: 'selects', startingOvr: 'Starting OVR',
    signContract: 'Sign rookie contract', age: 'Age', morale: 'Team morale', rookieSeason: 'Rookie season', seasonStats: 'Season stats',
    playoffs: 'Playoffs', game: 'Game', result: 'Result', court: 'Court', simulateSeries: 'Simulate series', simulateGame: 'Simulate game',
    gameLocked: 'Game mode locked until series ends', playoffsComplete: 'Playoffs complete', continue: 'Continue', careerEnded: 'Career ended',
    viewLegacy: 'View legacy', transferWindow: 'Transfer window', yearsOld: 'years old', contractExpired: 'Your contract expired',
    listenOffers: 'Listen to offers', contract: 'Contract', yearsLeft: 'years left', simulateSeason: 'Simulate season',
    simulateCareer: 'Simulate career to end', preferredTeam: 'Preferred team', requestTrade: 'Request trade', retire: 'Announce retirement',
    press: 'The press', standings: 'League standings', eastern: 'Eastern', western: 'Western', seasonLeaders: 'Season leaders',
    legacy: 'Legacy', careerScore: 'Career score', careerTotals: 'Career totals', points: 'Points', rebounds: 'Rebounds', assists: 'Assists',
    games: 'Games', comparisons: 'NBA career comparisons', careerPath: 'Career path', trophyCabinet: 'Trophy cabinet',
    records: 'Records & legacy', yearByYear: 'Year-by-year stats', originalDna: 'Original DNA', earnings: 'Career earnings',
    newCareer: 'New career', breakingNews: 'Breaking news', season: 'Season', seasons: 'Seasons', themeLight: 'Switch to light mode',
    themeDark: 'Switch to dark mode', language: 'Language', careerAverages: 'Career averages', retiredJerseys: 'Retired jerseys',
    closestProfiles: 'Closest historical profiles', rings: 'Rings', ring: 'Ring', allTime: 'All-time NBA leaderboard', steals: 'Steals', blocks: 'Blocks',
    mvpAwards: 'MVP awards', championships: 'Championships', dpoyAwards: 'DPOY awards', awardsNotes: 'Awards & notes',
    rookieReady: 'The rookie is ready. The world is watching.', playoffBegins: '{team} begins its playoff run.',
    championNews: '{player} leads {team} to the NBA championship!', missesPlayoffs: 'Disaster! {team} misses the playoffs.',
    eliminatedNews: '{team} was eliminated in {round}.', historicScoring: '{player} had a historic scoring season averaging {ppg} PPG.',
    namedMvp: '{player} was named MVP!', injuryNews: '{injury}: {games} games missed.',
    year: 'year', years: 'years', seasonSingular: 'season', seasonPlural: 'seasons', stayAt: 'Stay at {team}', ageSuffix: 'yo',
    closestCareer: 'Closest career', alternative: 'Alternative #{number}', fullLegacy: 'Full legacy profile', statisticalProfile: 'Statistical profile',
    similar: 'Similar', careerSnapshot: '{seasons} seasons · {points} points · {rings} rings',
    differenceMore: 'More {dimension} than {player}', differenceLess: 'Less {dimension} than {player}', tableCaption: 'Season-by-season career statistics',
    yearShort: 'Yr', teamShort: 'Tm', ageShort: 'Age',
    confirmRetire: 'Are you sure you want to end your career? This action cannot be undone.'
  },
  es: {
    appName: 'GOAT Simulator', tagline: 'Construye la carrera. Entra en la historia.', howItWorks: 'Cómo funciona',
    heroTitle: 'Roba atributos de leyendas. Vive una carrera. Descubre si eres el GOAT.', playerName: 'Tu nombre',
    namePlaceholder: '¿Cómo te llamará el mundo?', nationality: 'Nacionalidad', position: 'Elige tu posición', jersey: 'Número de camiseta',
    difficulty: 'Dificultad', amateur: 'Amateur', pro: 'Pro', amateurDesc: 'Mira los números exactos de las leyendas. 1 nuevo intento a ciegas.',
    proDesc: 'Números visibles. Identidades ocultas. Sin nuevos intentos.', startDraft: 'Comenzar draft', recentCareers: 'Tus carreras recientes',
    filledSlots: 'Atributos elegidos', blindReroll: 'Nuevo intento', noRerolls: 'Modo Pro: sin nuevos intentos', mysteryPlayer: 'Jugador misterioso',
    identityHidden: 'Identidad oculta', era: 'Era', selected: 'Elegido', yourPlayer: 'Tu jugador', withPick: 'Con la selección',
    selects: 'selecciona', startingOvr: 'OVR inicial', signContract: 'Firmar contrato de novato', age: 'Edad', morale: 'Moral del equipo',
    rookieSeason: 'Temporada de novato', seasonStats: 'Números de la temporada', playoffs: 'Playoffs', game: 'Partido', result: 'Resultado',
    court: 'Cancha', simulateSeries: 'Simular serie', simulateGame: 'Simular partido', gameLocked: 'Modo por partido activo hasta el final de la serie',
    playoffsComplete: 'Playoffs terminados', continue: 'Continuar', careerEnded: 'Carrera terminada', viewLegacy: 'Ver legado',
    transferWindow: 'Mercado de fichajes', yearsOld: 'años', contractExpired: 'Tu contrato terminó', listenOffers: 'Escuchar ofertas',
    contract: 'Contrato', yearsLeft: 'años restantes', simulateSeason: 'Simular temporada', simulateCareer: 'Simular carrera hasta el final',
    preferredTeam: 'Equipo preferido', requestTrade: 'Pedir traspaso', retire: 'Anunciar retiro', press: 'La prensa', standings: 'Clasificación',
    eastern: 'Este', western: 'Oeste', seasonLeaders: 'Líderes de la temporada', legacy: 'Legado', careerScore: 'Puntuación de carrera',
    careerTotals: 'Totales de carrera', points: 'Puntos', rebounds: 'Rebotes', assists: 'Asistencias', games: 'Partidos',
    comparisons: 'Comparaciones históricas', careerPath: 'Trayectoria', trophyCabinet: 'Sala de trofeos', records: 'Récords y legado',
    yearByYear: 'Temporada por temporada', originalDna: 'ADN original', earnings: 'Ganancias de carrera', newCareer: 'Nueva carrera',
    breakingNews: 'Última hora', season: 'Temporada', seasons: 'Temporadas', themeLight: 'Activar modo claro', themeDark: 'Activar modo oscuro', language: 'Idioma',
    careerAverages: 'Promedios de carrera', retiredJerseys: 'Camisetas retiradas', closestProfiles: 'Perfiles históricos más cercanos',
    rings: 'Títulos', ring: 'Título', allTime: 'Ranking histórico de la NBA', steals: 'Robos', blocks: 'Tapones', mvpAwards: 'Premios MVP',
    championships: 'Campeonatos', dpoyAwards: 'Premios DPOY', awardsNotes: 'Premios y notas',
    rookieReady: 'El novato está listo. El mundo está mirando.', playoffBegins: '{team} comienza su camino en los playoffs.',
    championNews: '¡{player} lleva a {team} al título de la NBA!', missesPlayoffs: '¡Desastre! {team} queda fuera de los playoffs.',
    eliminatedNews: '{team} fue eliminado en {round}.', historicScoring: '{player} tuvo una temporada histórica con {ppg} PPG.',
    namedMvp: '¡{player} fue elegido MVP!', injuryNews: '{injury}: {games} partidos perdidos.',
    year: 'año', years: 'años', seasonSingular: 'temporada', seasonPlural: 'temporadas', stayAt: 'Quedarse en {team}', ageSuffix: 'años',
    closestCareer: 'Carrera más cercana', alternative: 'Alternativa #{number}', fullLegacy: 'Perfil completo de legado',
    statisticalProfile: 'Perfil estadístico', similar: 'En común', careerSnapshot: '{seasons} temporadas · {points} puntos · {rings} títulos',
    differenceMore: 'Más {dimension} que {player}', differenceLess: 'Menos {dimension} que {player}', tableCaption: 'Estadísticas de carrera por temporada',
    yearShort: 'Año', teamShort: 'Eq', ageShort: 'Ed',
    confirmRetire: '¿Seguro que quieres terminar tu carrera? Esta acción no se puede deshacer.'
  }
} as const;

type MessageKey = keyof typeof messages.pt;
const locale = ref<Locale>('en');
const theme = ref<Theme>('dark');
const t = (key: MessageKey) => messages[locale.value][key];
const tf = (key: MessageKey, values: Record<string, string | number>) =>
  Object.entries(values).reduce<string>(
    (text, [name, value]) => text.replace(`{${name}}`, String(value)),
    t(key),
  );

type DataGroup = 'attributes' | 'positions' | 'roles' | 'rounds' | 'locations' | 'results' | 'tiers' | 'injuries' | 'awards' | 'dimensions' | 'countries';
const dataLabels: Record<Locale, Record<DataGroup, Record<string, string>>> = {
  en: {
    attributes: { Shooting: 'Shooting', Dribbling: 'Dribbling', Defense: 'Defense', IQ: 'Basketball IQ', Athleticism: 'Athleticism', Passing: 'Passing', Rebounding: 'Rebounding', Speed: 'Speed', Finishing: 'Finishing' },
    positions: { PG: 'Point Guard', SG: 'Shooting Guard', SF: 'Small Forward', PF: 'Power Forward', C: 'Center' },
    roles: { Star: 'Star', 'Franchise Player': 'Franchise player', Starter: 'Starter', Bench: 'Bench' },
    rounds: { '1st Round': 'First round', 'Conf. Semis': 'Conference semifinals', 'Conf. Finals': 'Conference finals', 'NBA Finals': 'NBA Finals' },
    locations: { HOME: 'Home', AWAY: 'Away' },
    results: { W: 'W', L: 'L' },
    tiers: { Journeyman: 'Journeyman', 'The Undisputed GOAT': 'The undisputed GOAT', 'Mount Rushmore': 'Mount Rushmore', 'Generational Talent': 'Generational talent', 'First Ballot Hall of Famer': 'First-ballot Hall of Famer', 'Hall of Famer': 'Hall of Famer', 'All-Time Great': 'All-time great', 'Multiple-Time All-Star': 'Multiple-time All-Star', 'Solid Starter': 'Solid starter', 'Role Player': 'Role player' },
    injuries: { 'Catastrophic knee injury': 'Catastrophic knee injury', 'Ankle sprain': 'Ankle sprain', 'Back tightness': 'Back tightness', 'Hamstring strain': 'Hamstring strain', 'Knee sprain': 'Knee sprain', 'Shoulder injury': 'Shoulder injury', 'Calf strain': 'Calf strain', 'ACL tear': 'ACL tear', 'Achilles tear': 'Achilles tear', 'Foot fracture': 'Foot fracture', 'Career-Ending Injury': 'Career-ending injury' },
    awards: { MVP: 'MVP', DPOY: 'Defensive Player of the Year', SMOTY: 'Sixth Man of the Year', ROTY: 'Rookie of the Year', 'All-Star': 'All-Star', 'Finals MVP': 'Finals MVP', 'All-NBA 1st Team': 'All-NBA First Team', 'All-NBA 2nd Team': 'All-NBA Second Team', 'All-NBA 3rd Team': 'All-NBA Third Team', 'All-Defense 1st Team': 'All-Defensive First Team', 'All-Defense 2nd Team': 'All-Defensive Second Team' },
    dimensions: { 'scoring production': 'scoring production', playmaking: 'playmaking', rebounding: 'rebounding', 'defensive production': 'defensive production', longevity: 'longevity', 'individual accolades': 'individual accolades', 'championship success': 'championship success' }
    ,countries: { US: 'United States', RS: 'Serbia', SI: 'Slovenia', FR: 'France', CA: 'Canada', AU: 'Australia', ES: 'Spain', GR: 'Greece', DE: 'Germany', BR: 'Brazil', IT: 'Italy', HR: 'Croatia', LT: 'Lithuania', AR: 'Argentina' }
  },
  pt: {
    attributes: { Shooting: 'Arremesso', Dribbling: 'Drible', Defense: 'Defesa', IQ: 'QI de basquete', Athleticism: 'Atletismo', Passing: 'Passe', Rebounding: 'Rebote', Speed: 'Velocidade', Finishing: 'Finalização' },
    positions: { PG: 'Armador', SG: 'Ala-armador', SF: 'Ala', PF: 'Ala-pivô', C: 'Pivô' },
    roles: { Star: 'Estrela', 'Franchise Player': 'Jogador da franquia', Starter: 'Titular', Bench: 'Reserva' },
    rounds: { '1st Round': 'Primeira rodada', 'Conf. Semis': 'Semifinais de conferência', 'Conf. Finals': 'Finais de conferência', 'NBA Finals': 'Finais da NBA' },
    locations: { HOME: 'Casa', AWAY: 'Fora' },
    results: { W: 'V', L: 'D' },
    tiers: { Journeyman: 'Veterano itinerante', 'The Undisputed GOAT': 'O GOAT incontestável', 'Mount Rushmore': 'Monte Rushmore', 'Generational Talent': 'Talento geracional', 'First Ballot Hall of Famer': 'Hall da Fama em primeira categoria', 'Hall of Famer': 'Hall da Fama', 'All-Time Great': 'Lenda', 'Multiple-Time All-Star': 'All-Star várias vezes', 'Solid Starter': 'Titular sólido', 'Role Player': 'Jogador de rotação' },
    injuries: { 'Catastrophic knee injury': 'Lesão catastrófica no joelho', 'Ankle sprain': 'Entorse no tornozelo', 'Back tightness': 'Rigidez nas costas', 'Hamstring strain': 'Distensão na coxa', 'Knee sprain': 'Entorse no joelho', 'Shoulder injury': 'Lesão no ombro', 'Calf strain': 'Distensão na panturrilha', 'ACL tear': 'Ruptura do ligamento cruzado', 'Achilles tear': 'Ruptura do tendão de Aquiles', 'Foot fracture': 'Fratura no pé', 'Career-Ending Injury': 'Lesão que encerrou a carreira' },
    awards: { MVP: 'MVP', DPOY: 'Defensor do Ano', SMOTY: 'Sexto Homem do Ano', ROTY: 'Novato do Ano', 'All-Star': 'All-Star', 'Finals MVP': 'MVP das Finais', 'All-NBA 1st Team': 'Primeiro time All-NBA', 'All-NBA 2nd Team': 'Segundo time All-NBA', 'All-NBA 3rd Team': 'Terceiro time All-NBA', 'All-Defense 1st Team': 'Primeiro time de defesa', 'All-Defense 2nd Team': 'Segundo time de defesa' },
    dimensions: { 'scoring production': 'produção ofensiva', playmaking: 'criação de jogadas', rebounding: 'rebotes', 'defensive production': 'produção defensiva', longevity: 'longevidade', 'individual accolades': 'prêmios individuais', 'championship success': 'sucesso em campeonatos' }
    ,countries: { US: 'Estados Unidos', RS: 'Sérvia', SI: 'Eslovênia', FR: 'França', CA: 'Canadá', AU: 'Austrália', ES: 'Espanha', GR: 'Grécia', DE: 'Alemanha', BR: 'Brasil', IT: 'Itália', HR: 'Croácia', LT: 'Lituânia', AR: 'Argentina' }
  },
  es: {
    attributes: { Shooting: 'Tiro', Dribbling: 'Regate', Defense: 'Defensa', IQ: 'IQ de baloncesto', Athleticism: 'Atletismo', Passing: 'Pase', Rebounding: 'Rebote', Speed: 'Velocidad', Finishing: 'Finalización' },
    positions: { PG: 'Base', SG: 'Escolta', SF: 'Alero', PF: 'Ala-pívot', C: 'Pívot' },
    roles: { Star: 'Estrella', 'Franchise Player': 'Jugador franquicia', Starter: 'Titular', Bench: 'Suplente' },
    rounds: { '1st Round': 'Primera ronda', 'Conf. Semis': 'Semifinales de conferencia', 'Conf. Finals': 'Finales de conferencia', 'NBA Finals': 'Finales de la NBA' },
    locations: { HOME: 'Local', AWAY: 'Visitante' },
    results: { W: 'V', L: 'D' },
    tiers: { Journeyman: 'Trotamundos', 'The Undisputed GOAT': 'El GOAT indiscutible', 'Mount Rushmore': 'Monte Rushmore', 'Generational Talent': 'Talento generacional', 'First Ballot Hall of Famer': 'Salón de la Fama en primera votación', 'Hall of Famer': 'Salón de la Fama', 'All-Time Great': 'Leyenda histórica', 'Multiple-Time All-Star': 'All-Star varias veces', 'Solid Starter': 'Titular sólido', 'Role Player': 'Jugador de rotación' },
    injuries: { 'Catastrophic knee injury': 'Lesión catastrófica de rodilla', 'Ankle sprain': 'Esguince de tobillo', 'Back tightness': 'Rigidez lumbar', 'Hamstring strain': 'Distensión de isquiotibiales', 'Knee sprain': 'Esguince de rodilla', 'Shoulder injury': 'Lesión de hombro', 'Calf strain': 'Distensión de pantorrilla', 'ACL tear': 'Rotura del ligamento cruzado', 'Achilles tear': 'Rotura del tendón de Aquiles', 'Foot fracture': 'Fractura de pie', 'Career-Ending Injury': 'Lesión que terminó la carrera' },
    awards: { MVP: 'MVP', DPOY: 'Defensor del Año', SMOTY: 'Sexto Hombre del Año', ROTY: 'Novato del Año', 'All-Star': 'All-Star', 'Finals MVP': 'MVP de las Finales', 'All-NBA 1st Team': 'Primer equipo All-NBA', 'All-NBA 2nd Team': 'Segundo equipo All-NBA', 'All-NBA 3rd Team': 'Tercer equipo All-NBA', 'All-Defense 1st Team': 'Primer equipo defensivo', 'All-Defense 2nd Team': 'Segundo equipo defensivo' },
    dimensions: { 'scoring production': 'producción anotadora', playmaking: 'creación de juego', rebounding: 'rebotes', 'defensive production': 'producción defensiva', longevity: 'longevidad', 'individual accolades': 'premios individuales', 'championship success': 'éxito en campeonatos' }
    ,countries: { US: 'Estados Unidos', RS: 'Serbia', SI: 'Eslovenia', FR: 'Francia', CA: 'Canadá', AU: 'Australia', ES: 'España', GR: 'Grecia', DE: 'Alemania', BR: 'Brasil', IT: 'Italia', HR: 'Croacia', LT: 'Lituania', AR: 'Argentina' }
  }
};

const label = (group: DataGroup, value: string) => dataLabels[locale.value][group][value] ?? value;
const localizeComparisonDifference = (value: string) => {
  const match = value.match(/^(More|Less) (.+) than (.+)$/);
  if (!match) return value;
  return tf(match[1] === 'More' ? 'differenceMore' : 'differenceLess', { dimension: label('dimensions', match[2]), player: match[3] });
};

const localizeDynamicText = (value: string) => {
  const activeLocale = locale.value;
  if (activeLocale === 'en') return value;
  const fixed: Record<'pt' | 'es', Record<string, string>> = {
    pt: {
      'Trade request denied.': 'Pedido de troca negado.', 'Trade Request Denied': 'Pedido de troca negado',
      'Your production, team record or contract convinced the club to retain you.': 'Sua produção, a campanha do time ou o contrato convenceram o clube a manter você.',
      'The club moved you after morale collapsed.': 'O clube trocou você após a queda de moral.', 'Your trade request was accepted.': 'Seu pedido de troca foi aceito.',
      'The injury forces an immediate retirement.': 'A lesão força uma aposentadoria imediata.',
      '10,000 Career Points': '10.000 pontos na carreira', '20,000 Career Points': '20.000 pontos na carreira', '30,000 Career Points': '30.000 pontos na carreira',
      'A star is born.': 'Nasce uma estrela.', 'Entering the Hall of Fame discussion.': 'Entrando na conversa do Hall da Fama.', 'Absolute Legend.': 'Lenda absoluta.',
      'Scoring Machine': 'Máquina de pontos', 'MVP Award': 'Prêmio de MVP', 'The best player in the world.': 'O melhor jogador do mundo.',
      'Defensive Player of the Year': 'Defensor do Ano', "The league's best defender.": 'O melhor defensor da liga.',
      'Sixth Man of the Year': 'Sexto Homem do Ano', "The league's best player off the bench.": 'O melhor reserva da liga.',
      'Rookie of the Year': 'Novato do Ano', 'The best rookie in the league.': 'O melhor novato da liga.', 'NBA Champion': 'Campeão da NBA',
      'Another ring added to your legacy.': 'Mais um título para o seu legado.', 'The best player on the biggest stage.': 'O melhor jogador no maior palco.'
    },
    es: {
      'Trade request denied.': 'Solicitud de traspaso rechazada.', 'Trade Request Denied': 'Solicitud de traspaso rechazada',
      'Your production, team record or contract convinced the club to retain you.': 'Tu producción, el récord del equipo o el contrato convencieron al club de retenerte.',
      'The club moved you after morale collapsed.': 'El club te traspasó tras la caída de la moral.', 'Your trade request was accepted.': 'Tu solicitud de traspaso fue aceptada.',
      'The injury forces an immediate retirement.': 'La lesión obliga a un retiro inmediato.',
      '10,000 Career Points': '10.000 puntos de carrera', '20,000 Career Points': '20.000 puntos de carrera', '30,000 Career Points': '30.000 puntos de carrera',
      'A star is born.': 'Nace una estrella.', 'Entering the Hall of Fame discussion.': 'Entrando en la conversación del Salón de la Fama.', 'Absolute Legend.': 'Leyenda absoluta.',
      'Scoring Machine': 'Máquina anotadora', 'MVP Award': 'Premio MVP', 'The best player in the world.': 'El mejor jugador del mundo.',
      'Defensive Player of the Year': 'Defensor del Año', "The league's best defender.": 'El mejor defensor de la liga.',
      'Sixth Man of the Year': 'Sexto Hombre del Año', "The league's best player off the bench.": 'El mejor suplente de la liga.',
      'Rookie of the Year': 'Novato del Año', 'The best rookie in the league.': 'El mejor novato de la liga.', 'NBA Champion': 'Campeón de la NBA',
      'Another ring added to your legacy.': 'Otro título para tu legado.', 'The best player on the biggest stage.': 'El mejor jugador en el mayor escenario.'
    }
  };
  if (fixed[activeLocale][value]) return fixed[activeLocale][value];
  const traded = value.match(/^Traded to (.+)\.?$/);
  if (traded) return activeLocale === 'pt' ? `Trocado para ${traded[1].replace(/\.$/, '')}.` : `Traspasado a ${traded[1].replace(/\.$/, '')}.`;
  const missed = value.match(/^(\d+) games missed\.$/);
  if (missed) return activeLocale === 'pt' ? `${missed[1]} jogos perdidos.` : `${missed[1]} partidos perdidos.`;
  const averaged = value.match(/^Averaged (.+) PPG this season\.$/);
  if (averaged) return activeLocale === 'pt' ? `Média de ${averaged[1]} PPG nesta temporada.` : `Promedio de ${averaged[1]} PPG esta temporada.`;
  return label('injuries', label('awards', value));
};

const applyTheme = () => {
  document.documentElement.classList.toggle('dark', theme.value === 'dark');
  document.documentElement.style.colorScheme = theme.value;
};

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  localStorage.setItem('the_goat_theme', theme.value);
  applyTheme();
};

const setLocale = (value: Locale) => {
  locale.value = value;
  localStorage.setItem('the_goat_locale', value);
  document.documentElement.lang = value;
};

// Motor do Jogo
const { 
  player, history, careerTotals, leagueTeams, freeAgencyOffers, pendingMilestones,
  lastTransactionMessage, playoffPresentation,
  initCareer, simulateSeason, generateOffers, acceptOffer, forceRetirement,
  requestTrade, loadPastCareer, simulateRemainingCareer,
  simulateNextPlayoffSeries, simulateNextPlayoffGame,
  finishPlayoffPresentation
} = useGameEngine();

// Motor de Draft
const { 
  currentDrawnPlayer, 
  myAttributes, 
  hasReroll, 
  isDraftComplete, 
  drawRandomPlayer, 
  useReroll, 
  selectAttribute, 
  getRandomTeam,
  generateRookieAttributes,
  calculateDraftPick,
  resetDraft,
  attributeSources
} = useDraft();

const availableSlots = computed(() => Object.keys(myAttributes.value) as Array<keyof typeof myAttributes.value>);

// Utilitários de Dev/Teste
const executeStressTest = async () => {
  if (!import.meta.env.DEV) return;

  const { runStressTest } = await import('./utils/stressTest');
  const attributeValues = [97];

  for (const fixedAttributeValue of attributeValues) {
    await runStressTest({
      iterationsPerPosition: 50,
      fixedAttributeValue,
    });
  }
};

// Estados do Formulário e do Jogo
type GamePhase = 'setup' | 'draft-steal' | 'draft-day' | 'playing' | 'retired';
type PastCareer = Parameters<typeof loadPastCareer>[0];
type LastSetup = {
  name?: string;
  position?: Position;
  nationality?: string;
  jersey?: number;
};

const currentPhase = ref<GamePhase>('setup');
const isDev = import.meta.env.DEV;

const inputName = ref('');
const inputPosition = ref<Position | ''>('');
const inputNationality = ref('');
const inputJersey = ref<number | ''>('');
const selectedDifficulty = ref<Difficulty>('amateur');
const draftPickResult = ref(60);
const pastCareers = ref<PastCareer[]>([]);
const milestoneButton = ref<HTMLButtonElement | null>(null);
const selectedTradeTeam = ref('');

const viewPastCareer = (career: PastCareer) => {
  loadPastCareer(career);
  currentPhase.value = 'retired';
};

// --- PROPRIEDADES COMPUTADAS (Dashboard e OVR) ---

// Declarado antes do newsFeed para evitar erros de inicialização
const lastSeason = computed(() => history.value.length === 0 ? null : history.value[history.value.length - 1]);
const currentPlayoffSeries = computed(() =>
  lastSeason.value?.playoffs?.series[playoffPresentation.value.seriesIndex] ?? null,
);
const completedPlayoffSeries = computed(() =>
  lastSeason.value?.playoffs?.series.slice(0, playoffPresentation.value.seriesIndex) ?? [],
);
const revealedCurrentPlayoffGames = computed(() =>
  currentPlayoffSeries.value?.games.slice(0, playoffPresentation.value.currentGame) ?? [],
);

// Correção: player.value utilizado em todos os acessos
const isFreeAgent = computed(() => player.value.contractYearsLeft === 0 && !player.value.isRetired);
const canChooseTradeTarget = computed(() => player.value.morale >= 70);
const tradeTargets = computed(() =>
  leagueTeams.value.filter(team => team.id !== player.value.teamId),
);

const newsFeed = computed(() => {
  if (!lastSeason.value) return [t('rookieReady')];
  if (playoffPresentation.value.active) {
    return [tf('playoffBegins', { team: lastSeason.value.teamId })];
  }
  const news = [];
  
  // Segurança com "?." caso playoffs não tenha sido gerado
  const seasonTeamId = lastSeason.value.teamId;
  const championTeamId = lastSeason.value.playoffs?.championTeamId;
  if (lastSeason.value.playoffs?.wonRing) {
    news.push(tf('championNews', { player: player.value.name, team: seasonTeamId }));
  } else if (!lastSeason.value.playoffs?.madePlayoffs) {
    news.push(tf('missesPlayoffs', { team: seasonTeamId }));
  } else {
    news.push(tf('eliminatedNews', { team: seasonTeamId, round: label('rounds', lastSeason.value.playoffs?.eliminatedIn ?? '') }));
  }
  if (championTeamId && championTeamId !== seasonTeamId) {
    news.push(tf('championNews', {
      player: lastSeason.value.leagueAwards.FMVP,
      team: championTeamId,
    }));
  }

  if (lastSeason.value.ppg > 30) news.push(tf('historicScoring', { player: player.value.name, ppg: lastSeason.value.ppg }));
  if (lastSeason.value.awards?.includes('MVP')) news.push(tf('namedMvp', { player: player.value.name }));
  if (lastSeason.value.injury) {
    news.push(tf('injuryNews', { injury: label('injuries', lastSeason.value.injury.name), games: lastSeason.value.injury.gamesMissed }));
  }
  if (lastTransactionMessage.value) news.push(localizeDynamicText(lastTransactionMessage.value));
  
  return news;
});

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

const refreshPastCareerScores = (careers: PastCareer[]) =>
  careers.map(career => {
    const counts: Record<string, number> = {};
    career.history.forEach(season => {
      season.awards?.forEach(award => {
        counts[award] = (counts[award] ?? 0) + 1;
      });
    });
    const evaluation = calculateGoatScore(
      career.careerTotals,
      Object.entries(counts),
    );

    return {
      ...career,
      goatScore: evaluation.score,
      goatTier: evaluation.tier,
    };
  });

const formattedTimeline = computed(() => {
  if (!player.value.careerTimeline) return [];
  return player.value.careerTimeline.map((entry, index) => {
    const isLast = index === player.value.careerTimeline.length - 1;
    const end = entry.endYear !== null ? entry.endYear : history.value.length;
    const startAge = 19 + entry.startYear - 1;
    const endAge = 19 + end - 1;
    return {
      teamId: entry.teamId,
      period: startAge === endAge ? `${startAge}` : `${startAge}-${endAge}`,
      isLast
    };
  });
});

const trophyCabinet = computed(() => {
  const counts: Record<string, number> = {};
  history.value.forEach(season => {
    if (season.playoffs?.wonRing) counts['Rings'] = (counts['Rings'] || 0) + 1;
    season.awards?.forEach((award: string) => counts[award] = (counts[award] || 0) + 1);
  });
  return counts;
});

const sortedAwards = computed(() => {
  return Object.entries(trophyCabinet.value)
    .filter(([award]) => !['Rings', 'MVP', 'Finals MVP', 'DPOY'].includes(award))
    .sort((a, b) => b[1] - a[1]);
});

const detailedAwards = computed(() => {
  const counts: Record<string, number> = {};
  history.value.forEach(season => season.awards?.forEach((award: string) => counts[award] = (counts[award] || 0) + 1));
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
});

const goatEvaluation = computed(() => calculateGoatScore(careerTotals.value, detailedAwards.value));
const careerComparisons = computed(() => compareCareer({
  position: player.value.position,
  totals: careerTotals.value,
  awards: trophyCabinet.value,
}));

const careerAverages = computed(() => {
  const games = Math.max(1, careerTotals.value.gamesPlayed);
  const weighted = (key: 'fgPct' | 'fg3Pct' | 'ftPct') =>
    history.value.reduce(
      (sum, season) => sum + season[key] * (season.gamesPlayed ?? 82),
      0,
    ) / games;

  return {
    ppg: careerTotals.value.totalPoints / games,
    rpg: careerTotals.value.totalRebounds / games,
    apg: careerTotals.value.totalAssists / games,
    spg: careerTotals.value.totalSteals / games,
    bpg: careerTotals.value.totalBlocks / games,
    fgPct: weighted('fgPct'),
    fg3Pct: weighted('fg3Pct'),
    ftPct: weighted('ftPct'),
  };
});

const retiredJerseys = computed(() =>
  calculateRetiredJerseys(
    history.value,
    Number(player.value.jerseyNumber),
  ),
);

const getRecordPercentage = (current: number, record: number) => {
  return Math.min(100, (current / record) * 100).toFixed(1);
};

const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;


// --- CONSTANTES E OPÇÕES ---

const nbaRecords = {
  points: 40474, assists: 15806, rebounds: 23924,
  steals: 3265, blocks: 3830, rings: 11, mvps: 6
};

const nationalities = [
  { code: 'US', name: 'USA', flag: '🇺🇸' }, { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮' }, { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' }, { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' }, { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' }, { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' }, { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹' }, { code: 'AR', name: 'Argentina', flag: '🇦🇷' }
];

const positions = [
  { code: 'PG', name: 'Point Guard' }, { code: 'SG', name: 'Shooting Guard' },
  { code: 'SF', name: 'Small Forward' }, { code: 'PF', name: 'Power Forward' },
  { code: 'C', name: 'Center' }
];

const easternTeams = computed(() => {
  if (!leagueTeams.value) return [];
  const eastIds = ['BOS','NYK','PHI','MIL','CLE','IND','MIA','ORL','CHI','ATL','BKN','TOR','CHA','WAS','DET'];
  return leagueTeams.value
    .filter(team => eastIds.includes(team.id))
    .sort((a, b) => (b.wins || 0) - (a.wins || 0));
});

const westernTeams = computed(() => {
  if (!leagueTeams.value) return [];
  const westIds = ['DEN','OKC','MIN','LAC','DAL','PHX','LAL','NOP','SAC','GSW','HOU','UTA','MEM','SAS','POR'];
  return leagueTeams.value
    .filter(team => westIds.includes(team.id))
    .sort((a, b) => (b.wins || 0) - (a.wins || 0));
});

// --- AÇÕES DO JOGO ---

const startDraftSteal = () => {
  if (!inputName.value || !inputPosition.value || !inputNationality.value || inputJersey.value === '') return;
  
  localStorage.setItem('the_goat_last_setup', JSON.stringify({
    name: inputName.value,
    position: inputPosition.value,
    nationality: inputNationality.value,
    jersey: inputJersey.value
  }));
  
  currentPhase.value = 'draft-steal';
  drawRandomPlayer();
};

const bestSeasonNumber = computed(() => findBestSeasonNumber(history.value));

const processDraftDay = () => {
  const peakAttributes: PlayerAttributes = { ...myAttributes.value };
  const rookieAttributes = generateRookieAttributes(peakAttributes);
  const initialOvr = calculateOverall(
    rookieAttributes,
    inputPosition.value as Position,
  );
  const draftedTeam = getRandomTeam();
  
  draftPickResult.value = calculateDraftPick(initialOvr);
  
  initCareer(
    inputName.value, 
    inputPosition.value as Position, 
    inputNationality.value, 
    inputJersey.value as number, 
    selectedDifficulty.value,
    attributeSources.value
  );
  
  // Correção: Atualização das propriedades da ref `player` usando `.value`
  player.value.teamId = draftedTeam;
  player.value.ovr = initialOvr;
  player.value.attributes = rookieAttributes;
  player.value.potentialAttributes = peakAttributes;
  player.value.age = 19;
  
  player.value.careerTimeline.push({
    teamId: draftedTeam,
    startYear: 1,
    endYear: null
  });
  
  currentPhase.value = 'draft-day';
};

const startCareer = () => { 
  player.value.originalDNA = JSON.parse(JSON.stringify(attributeSources.value));
  currentPhase.value = 'playing';
};
const viewLegacy = () => { currentPhase.value = 'retired'; };

const resetGame = () => {
  pastCareers.value = refreshPastCareerScores(
    readStorage<PastCareer[]>('the_goat_past_careers', []),
  );
  resetDraft();
  currentPhase.value = 'setup';
};

const dismissMilestone = () => pendingMilestones.value.shift();

const submitTradeRequest = () => {
  requestTrade(
    canChooseTradeTarget.value && selectedTradeTeam.value
      ? selectedTradeTeam.value
      : undefined,
  );
  selectedTradeTeam.value = '';
};

const retireManual = () => {
  if (confirm(t('confirmRetire'))) {
    forceRetirement();
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem('the_goat_theme');
  theme.value = savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const savedLocale = localStorage.getItem('the_goat_locale');
  const hasCurrentLocalePreference = localStorage.getItem('the_goat_locale_version') === '2';
  setLocale(hasCurrentLocalePreference && (savedLocale === 'pt' || savedLocale === 'es') ? savedLocale : 'en');
  localStorage.setItem('the_goat_locale_version', '2');
  applyTheme();
  pastCareers.value = refreshPastCareerScores(
    readStorage<PastCareer[]>('the_goat_past_careers', []),
  );
  const lastSetup = readStorage<LastSetup>('the_goat_last_setup', {});
  if (lastSetup.name) {
    inputName.value = lastSetup.name;
    inputPosition.value = lastSetup.position ?? '';
    inputNationality.value = lastSetup.nationality ?? '';
    inputJersey.value = lastSetup.jersey ?? '';
  }
});

let draftTimer: ReturnType<typeof setTimeout> | undefined;

watch(() => isDraftComplete.value, (newVal) => {
  if (newVal) {
    draftTimer = setTimeout(processDraftDay, 600);
  }
});

watch(
  () => pendingMilestones.value.length,
  async length => {
    if (length > 0) {
      await nextTick();
      milestoneButton.value?.focus();
    }
  },
);

onBeforeUnmount(() => {
  if (draftTimer) clearTimeout(draftTimer);
});
</script>

<template>
  <main class="min-h-screen bg-[#f4f1ea] text-zinc-950 transition-colors duration-300 dark:bg-[#0b0c0e] dark:text-zinc-100">
    <div class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <header class="mb-12 flex min-h-24 items-center justify-between border-b border-black/10 dark:border-white/10">
        <button type="button" class="group text-left" @click="resetGame">
          <span class="block text-xl font-black uppercase tracking-[-0.04em] sm:text-2xl">GOAT<span class="text-amber-700 dark:text-red-400">//</span>SIM</span>
          <span class="hidden text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500 sm:block">{{ t('tagline') }}</span>
        </button>
        <div class="flex items-center gap-2">
          <div class="flex rounded-full border border-black/10 bg-white p-1 dark:border-white/10 dark:bg-zinc-900" :aria-label="t('language')">
            <button
              v-for="language in (['pt', 'en', 'es'] as const)"
              :key="language"
              type="button"
              class="rounded-full px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider transition-colors"
              :class="locale === language ? 'bg-zinc-950 text-white dark:bg-red-500 dark:text-white' : 'text-zinc-500 hover:text-zinc-950 dark:hover:text-white'"
              :aria-pressed="locale === language"
              @click="setLocale(language)"
            >
              {{ language }}
            </button>
          </div>
          <button
            type="button"
            class="grid size-10 place-items-center rounded-full border border-black/10 bg-white text-lg transition hover:-rotate-6 hover:border-amber-500 dark:hover:border-red-500 dark:border-white/10 dark:bg-zinc-900"
            :aria-label="theme === 'dark' ? t('themeLight') : t('themeDark')"
            @click="toggleTheme"
          >
            <span aria-hidden="true">{{ theme === 'dark' ? '☀' : '☾' }}</span>
          </button>
        </div>
      </header>

      <!-- FASE 1: SETUP (Estilo Dark/Grids) -->
      <section v-if="currentPhase === 'setup'" class="mx-auto max-w-5xl pb-12">
        <div class="mb-12 grid gap-5 border-b border-black/10 pb-10 dark:border-white/10 md:grid-cols-[1fr_2fr] md:items-end">
          <p class="text-xs font-black uppercase tracking-[0.24em] text-amber-700 dark:text-red-400">01 — {{ t('howItWorks') }}</p>
          <h2 class="max-w-3xl text-4xl font-black uppercase leading-[0.92] tracking-[-0.055em] text-zinc-950 dark:text-white sm:text-6xl">{{ t('heroTitle') }}</h2>
        </div>
        
        <div class="grid gap-4 lg:grid-cols-12">
          
          <!-- Nome -->
          <div class="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-950 sm:p-7 lg:col-span-8">
            <label for="player-name" class="mb-4 block text-xs font-black uppercase tracking-[0.2em] text-gray-500">{{ t('playerName') }}</label>
            <input
              id="player-name"
              v-model.trim="inputName"
              type="text"
              autocomplete="name"
              class="w-full rounded-xl border border-black/10 bg-white px-6 py-5 text-xl font-bold text-zinc-950 transition-colors focus-visible:border-amber-500 dark:focus-visible:border-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-red-500 dark:border-white/10 dark:bg-zinc-950 dark:text-white"
              :placeholder="t('namePlaceholder')"
            />
          </div>

          <!-- Nacionalidade -->
          <fieldset class="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-950 sm:p-7 lg:col-span-12">
            <legend class="px-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500">{{ t('nationality') }}</legend>
            <div class="grid grid-cols-4 gap-2 sm:grid-cols-7">
              <button 
                v-for="nat in nationalities" 
                :key="nat.code"
                type="button"
                @click="inputNationality = nat.code"
                :class="inputNationality === nat.code ? 'border-amber-500 dark:border-red-500 bg-amber-400 dark:bg-red-500 text-black dark:text-white -translate-y-0.5 shadow-[0_5px_0_0_rgba(0,0,0,0.16)]' : 'border-black/10 bg-stone-50 text-zinc-600 hover:-translate-y-0.5 hover:border-gray-500 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400'"
                class="flex aspect-square items-center justify-center rounded-xl border transition-all"
                :aria-pressed="inputNationality === nat.code"
                :aria-label="label('countries', nat.code)"
                :title="label('countries', nat.code)"
              >
                <img
                  :src="`https://flagcdn.com/w80/${nat.code.toLowerCase()}.png`"
                  :alt="label('countries', nat.code)"
                  class="h-7 w-10 rounded-sm object-cover shadow-sm"
                />
              </button>
            </div>
          </fieldset>

          <!-- Posição -->
          <fieldset class="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-950 sm:p-7 lg:col-span-12">
            <legend class="px-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500">{{ t('position') }}</legend>
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-5">
              <button 
                v-for="pos in positions" 
                :key="pos.code"
                type="button"
                @click="inputPosition = pos.code as Position"
                :class="inputPosition === pos.code ? 'bg-amber-400 dark:bg-red-500 text-black dark:text-white border-amber-500 dark:border-red-500' : 'bg-white dark:bg-zinc-950 border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-gray-500'"
                class="flex min-h-24 flex-col items-center justify-center rounded-xl border py-4 transition-all hover:-translate-y-0.5"
                :aria-pressed="inputPosition === pos.code"
                :aria-label="label('positions', pos.code)"
              >
                <span class="font-black text-xl">{{ pos.code }}</span>
                <span class="mt-1 text-[9px] font-bold uppercase opacity-80">{{ label('positions', pos.code) }}</span>
              </button>
            </div>
          </fieldset>

          <!-- Número da Camisa -->
          <div class="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-950 sm:p-7 lg:col-span-4 lg:col-start-9 lg:row-start-1">
            <label for="jersey-number" class="mb-4 block text-xs font-black uppercase tracking-[0.2em] text-gray-500">{{ t('jersey') }}</label>
            <input
              id="jersey-number"
              v-model.number="inputJersey"
              type="number"
              min="0"
              max="99"
              inputmode="numeric"
              class="w-full appearance-none rounded-xl border border-black/10 bg-stone-50 px-6 py-5 text-center text-4xl font-black text-zinc-950 transition-colors focus-visible:border-amber-500 dark:focus-visible:border-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-red-500 dark:border-white/10 dark:bg-zinc-900 dark:text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="0-99"
            />
          </div>

          <!-- Modos de Jogo e Dificuldade -->
          <div class="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-950 sm:p-7 lg:col-span-12">
            <fieldset>
              <legend class="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest">{{ t('difficulty') }}</legend>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  type="button"
                  @click="selectedDifficulty = 'amateur'"
                  :class="selectedDifficulty === 'amateur' ? 'border-amber-500 dark:border-red-500 bg-stone-50 dark:bg-zinc-900' : 'border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950'"
                  class="border p-5 rounded-lg text-left transition-colors"
                  :aria-pressed="selectedDifficulty === 'amateur'"
                  :aria-label="`${t('difficulty')}: ${t('amateur')}`"
                >
                  <p class="font-black text-zinc-950 dark:text-white text-lg uppercase mb-1" :class="selectedDifficulty === 'amateur' ? 'text-amber-700 dark:text-red-400' : ''">{{ t('amateur') }} <span v-if="selectedDifficulty === 'amateur'" class="text-amber-700 dark:text-red-400 text-xs ml-1">●</span></p>
                  <p class="text-xs text-zinc-600 dark:text-zinc-400 font-bold">{{ t('amateurDesc') }}</p>
                </button>
                <button 
                  type="button"
                  @click="selectedDifficulty = 'pro'"
                  :class="selectedDifficulty === 'pro' ? 'border-amber-500 dark:border-red-500 bg-stone-50 dark:bg-zinc-900' : 'border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950'"
                  class="border p-5 rounded-lg text-left transition-colors"
                  :aria-pressed="selectedDifficulty === 'pro'"
                  :aria-label="`${t('difficulty')}: ${t('pro')}`"
                >
                  <p class="font-black text-zinc-950 dark:text-white text-lg uppercase mb-1" :class="selectedDifficulty === 'pro' ? 'text-amber-700 dark:text-red-400' : ''">{{ t('pro') }}</p>
                  <p class="text-xs text-zinc-600 dark:text-zinc-400 font-bold">{{ t('proDesc') }}</p>
                </button>
              </div>
            </fieldset>
          </div>

          <div class="pt-4 text-center lg:col-span-12">
            <button 
              type="button"
              @click="startDraftSteal" 
              :disabled="!inputName || !inputPosition || !inputNationality || inputJersey === ''"
              class="mx-auto bg-amber-400 dark:bg-red-500 text-black dark:text-white font-black py-5 px-16 rounded-full hover:bg-amber-300 dark:hover:bg-red-400 uppercase tracking-widest transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xl shadow-lg"
            >
              {{ t('startDraft') }}
            </button>
          </div>

          <!-- Debug Button (Posicionado discretamente no canto) -->
          <button
            v-if="isDev"
            type="button"
            class="fixed bottom-4 right-4 bg-red-900/50 hover:bg-red-600 text-zinc-950 dark:text-white p-2 rounded text-[9px] uppercase font-black tracking-widest opacity-30 hover:opacity-100 transition-opacity z-50"
            @click="executeStressTest"
          >
            Run Stress Test
          </button>
        </div>
      <!-- NOVO: Histórico de Carreiras Aposentadas -->
        <div v-if="pastCareers.length > 0" class="mt-20 pt-10 border-t border-black/10 dark:border-white/10">
          <p class="text-sm font-bold text-gray-500 mb-6 uppercase tracking-widest">{{ t('recentCareers') }}</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <button 
                v-for="car in pastCareers" 
                :key="car.id" 
                @click="viewPastCareer(car)" 
                class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 hover:border-amber-500 dark:hover:border-red-500 p-6 rounded-xl text-left transition-colors group relative overflow-hidden"
             >
                <div class="absolute inset-0 bg-amber-400/5 dark:bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative z-10 flex justify-between items-start mb-3">
                   <span class="text-3xl font-black text-amber-700 dark:text-red-400">{{ car.goatScore }}</span>
                   <span class="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{{ label('positions', car.player.position) }} · {{ label('countries', car.player.nationality) }}</span>
                </div>
                <h4 class="relative z-10 text-zinc-950 dark:text-white font-black uppercase text-lg mb-1">{{ car.player.name }}</h4>
                <p class="relative z-10 mb-3 text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-red-400">{{ label('tiers', car.goatTier) }}</p>
                <div class="relative z-10 text-zinc-600 dark:text-zinc-400 text-xs font-bold border-t border-black/10 dark:border-white/10 pt-3 mt-3 flex justify-between">
                   <span>{{ car.careerTotals.totalPoints }} PTS</span>
                   <span class="text-amber-700 dark:text-red-400">{{ car.rings }} {{ t('rings') }}</span>
                </div>
             </button>
          </div>
        </div>
      </section>

      <!-- FASE 2: DRAFT STEAL -->
      <section v-if="currentPhase === 'draft-steal'" class="max-w-4xl mx-auto pb-12">
        <!-- Status Bar -->
        <div class="flex justify-between items-center mb-6 border-b border-black/10 dark:border-white/10 pb-4">
          <div class="text-gray-500 text-xs font-bold uppercase tracking-widest">
            <span>{{ t('filledSlots') }} {{ Object.values(myAttributes).filter(v => v > 0).length }}/9</span>
            <span class="text-amber-700 dark:text-red-400 ml-2">{{ label('positions', inputPosition) }} · {{ selectedDifficulty === 'amateur' ? t('amateur') : t('pro') }}</span>
          </div>
          
          <button 
            v-if="selectedDifficulty === 'amateur'"
            @click="useReroll"
            :disabled="!hasReroll"
            class="border border-amber-500 dark:border-red-500 text-amber-700 dark:text-red-400 font-black py-2 px-6 rounded-full hover:bg-amber-400 dark:hover:bg-red-500 hover:text-black dark:hover:text-white uppercase text-[10px] tracking-widest transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {{ t('blindReroll') }} ({{ hasReroll ? '1' : '0' }})
          </button>
          <div v-else class="text-gray-600 text-[10px] uppercase font-black tracking-widest px-4 py-2 bg-stone-100 dark:bg-zinc-900 rounded-full">
            {{ t('noRerolls') }}
          </div>
        </div>

        <!-- Banner da Lenda Atual -->
        <div v-if="currentDrawnPlayer" class="relative z-10 flex flex-col items-center justify-center min-h-40">
    
          <h2 class="text-3xl md:text-5xl font-black text-zinc-950 dark:text-white uppercase tracking-widest mb-2 text-center">
            {{ selectedDifficulty === 'pro' ? t('mysteryPlayer') : currentDrawnPlayer.name }}
          </h2>
          
          <p class="text-gray-500 font-bold uppercase tracking-widest text-sm md:text-lg text-center flex items-center justify-center gap-2">
            <template v-if="selectedDifficulty === 'amateur'">
              {{ label('positions', currentDrawnPlayer.position) }}
              <span class="text-amber-700 dark:text-red-400">|</span>
              {{ t('era') }}: {{ currentDrawnPlayer.career }}
            </template>
            <template v-else>{{ t('identityHidden') }}</template>
          </p>
          
        </div>

        <!-- Grid de Atributos -->
        <div class="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <button 
            v-for="slot in availableSlots" 
            :key="slot"
            @click="selectAttribute(slot)"
            :disabled="myAttributes[slot] > 0"
            :class="myAttributes[slot] > 0 ? 'opacity-20 cursor-not-allowed border-gray-900' : 'hover:border-amber-500 dark:hover:border-red-500'"
            class="group flex min-h-28 flex-col items-center justify-center rounded-xl border border-black/10 bg-white p-4 transition-all hover:-translate-y-0.5 dark:border-white/10 dark:bg-zinc-950"
          >
            <span :class="myAttributes[slot] > 0 ? 'line-through text-gray-700' : 'text-gray-500 group-hover:text-amber-700 dark:group-hover:text-red-400'" class="text-[9px] font-bold uppercase tracking-widest mb-1 transition-colors">
              {{ label('attributes', slot) }}
            </span>
            <template v-if="myAttributes[slot] === 0">
              <span class="text-xl font-black text-zinc-950 dark:text-white">{{ currentDrawnPlayer?.attributes[slot] }}</span>
            </template>
            <span v-else class="text-[10px] font-black text-amber-700 dark:text-red-400 mt-1">{{ t('selected') }}</span>
          </button>
        </div>

          <!-- Painel: Seu Jogador (Slots Fixos) -->
          <div class="mt-12 border-t border-black/10 dark:border-white/10 pt-8">
            <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">{{ t('yourPlayer') }}</p>
            
            <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <!-- Itera sobre todas as chaves de atributos base (Shooting, Speed, etc) -->
              <div 
                v-for="(val, key) in myAttributes" 
                :key="key"
                class="flex flex-col items-center justify-center p-4 border rounded-xl h-28 transition-all duration-300"
                :class="val > 0 ? 'bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 shadow-lg' : 'bg-transparent border-black/10 dark:border-white/10 border-dashed opacity-40'"
              >
                <!-- Estado: Preenchido -->
                <template v-if="val > 0">
                  <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{{ label('attributes', key) }}</span>
                  <span class="text-2xl font-black text-zinc-950 dark:text-white" :class="val >= 90 ? 'text-amber-700 dark:text-red-400' : ''">{{ val }}</span>
                  <span class="text-[9px] text-zinc-600 dark:text-zinc-400 mt-2 truncate w-full text-center">
                     {{ selectedDifficulty === 'pro' ? t('mysteryPlayer') : attributeSources[key].player }}
                  </span>
                </template>
                
                <!-- Estado: Vazio (Aguardando Escolha) -->
                <template v-else>
                  <span class="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{{ label('attributes', key) }}</span>
                </template>
              </div>
            </div>
          </div>
      </section>

      <!-- FASE 3: DRAFT DAY REVEAL (Adaptado ao Dark Mode) -->
      <section v-if="currentPhase === 'draft-day'" class="bg-white dark:bg-zinc-950 p-10 rounded-xl border border-black/10 dark:border-white/10 max-w-xl mx-auto text-center shadow-2xl relative overflow-hidden mt-12">
        <div class="absolute inset-0 bg-amber-400/5 dark:bg-red-500/5 blur-3xl z-0"></div>
        <div class="relative z-10">
          <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{{ t('withPick') }} #{{ draftPickResult }}...</p>
          <h2 class="text-3xl font-black text-zinc-950 dark:text-white mb-2"><span class="text-amber-700 dark:text-red-400">{{ player.teamId }}</span> {{ t('selects') }}</h2>
          <h1 class="text-5xl font-black text-zinc-950 dark:text-white my-8 uppercase tracking-tighter">{{ player.name }}</h1>
          
          <div class="flex justify-center gap-12 mb-10 border-y border-black/10 dark:border-white/10 py-8 bg-stone-50 dark:bg-zinc-900/50 rounded-lg">
            <div>
              <p class="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">{{ t('startingOvr') }}</p>
              <p class="text-5xl font-black text-amber-700 dark:text-red-400">{{ player.ovr }}</p>
            </div>
            <div class="w-px bg-black/10 dark:bg-white/10"></div>
            <div>
              <p class="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">{{ t('position') }}</p>
              <p class="text-3xl font-black text-zinc-950 dark:text-white">{{ label('positions', player.position) }}</p>
            </div>
          </div>

          <button 
            @click="startCareer"
            class="w-full bg-white hover:bg-gray-200 text-black font-black py-5 rounded-full transition-colors uppercase tracking-widest text-lg"
          >
            {{ t('signContract') }}
          </button>
        </div>
      </section>
      <!-- FASE 4: SIMULAÇÃO -->
      <!-- FASE 4: O JOGO (HUB DA CARREIRA) -->
      <section v-if="currentPhase === 'playing'" class="max-w-7xl mx-auto pb-12 animate-fade-in">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- COLUNA ESQUERDA: Card do Jogador -->
          <div class="space-y-6 lg:top-6 lg:col-span-3 lg:self-start">
            <div class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 rounded-xl p-6 relative overflow-hidden">
              <div class="absolute top-0 right-0 p-4 opacity-10">
                <span class="text-6xl font-black">{{ player.jerseyNumber }}</span>
              </div>
              
              <div class="flex items-center gap-4 mb-6">
                <div class="flex size-12 items-center justify-center rounded-full bg-zinc-200 text-xl font-black text-zinc-950 dark:bg-zinc-800 dark:text-white">
                  {{ player.teamId }}
                </div>
                <div>
                  <h3 class="text-zinc-950 dark:text-white font-black uppercase text-xl">{{ player.name }}</h3>
                  <p class="text-gray-500 text-xs font-bold uppercase tracking-widest">{{ label('positions', player.position) }} · {{ label('countries', player.nationality) }}</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 border-y border-black/10 dark:border-white/10 py-4 mb-4">
                <div>
                  <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest">OVR</p>
                  <p class="text-3xl font-black text-amber-700 dark:text-red-400">{{ player.ovr }}</p>
                </div>
                <div>
                  <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{{ t('age') }}</p>
                  <p class="text-3xl font-black text-zinc-950 dark:text-white">{{ player.age }}</p>
                </div>
              </div>

              <div class="mb-5">
                <div class="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                  <span class="text-gray-500">{{ t('morale') }}</span>
                  <span class="text-amber-700 dark:text-red-400">{{ player.morale }}</span>
                </div>
                <div class="h-1.5 rounded-full bg-stone-100 dark:bg-zinc-900 overflow-hidden">
                  <div class="h-full bg-amber-400 dark:bg-red-500 transition-all" :style="`width: ${player.morale}%`"></div>
                </div>
              </div>

              <!-- Médias da última temporada -->
              <div>
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">
                  {{ lastSeason ? `${t('seasonStats')} ${lastSeason.seasonNumber}` : t('rookieSeason') }}
                </p>
                <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-zinc-600 dark:text-zinc-400 font-bold">MPG</span>
                    <span class="text-zinc-950 dark:text-white font-black">{{ lastSeason ? lastSeason.mpg.toFixed(1) : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-zinc-600 dark:text-zinc-400 font-bold">PTS</span>
                    <span class="text-zinc-950 dark:text-white font-black">{{ lastSeason ? lastSeason.ppg.toFixed(1) : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-zinc-600 dark:text-zinc-400 font-bold">REB</span>
                    <span class="text-zinc-950 dark:text-white font-black">{{ lastSeason ? lastSeason.rpg.toFixed(1) : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-zinc-600 dark:text-zinc-400 font-bold">AST</span>
                    <span class="text-zinc-950 dark:text-white font-black">{{ lastSeason ? lastSeason.apg.toFixed(1) : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-zinc-600 dark:text-zinc-400 font-bold">STL</span>
                    <span class="text-zinc-950 dark:text-white font-black">{{ lastSeason ? lastSeason.spg.toFixed(1) : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-zinc-600 dark:text-zinc-400 font-bold">BLK</span>
                    <span class="text-zinc-950 dark:text-white font-black">{{ lastSeason ? lastSeason.bpg.toFixed(1) : '0.0' }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-zinc-600 dark:text-zinc-400 font-bold">FG%</span>
                    <span class="text-zinc-950 dark:text-white font-black">{{ lastSeason ? (lastSeason.fgPct * 100).toFixed(1) : '0.0' }}%</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-zinc-600 dark:text-zinc-400 font-bold">3P%</span>
                    <span class="text-zinc-950 dark:text-white font-black">{{ lastSeason ? (lastSeason.fg3Pct * 100).toFixed(1) : '0.0' }}%</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-zinc-600 dark:text-zinc-400 font-bold">FT%</span>
                    <span class="text-zinc-950 dark:text-white font-black">{{ lastSeason ? (lastSeason.ftPct * 100).toFixed(1) : '0.0' }}%</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-zinc-600 dark:text-zinc-400 font-bold">+/-</span>
                    <span class="text-zinc-950 dark:text-white font-black">{{ lastSeason ? lastSeason.plusMinus.toFixed(1) : '0.0' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- COLUNA CENTRAL: Ação e Imprensa -->
          <div class="space-y-6 lg:col-span-9">
            
            <!-- Janela de Ação (Contrato ou Simulação) -->
            <div class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 rounded-xl p-6">
              <div v-if="playoffPresentation.active">
                <p class="text-amber-700 dark:text-red-400 text-[10px] font-black uppercase tracking-widest mb-2">{{ t('playoffs') }}</p>
                <div v-if="!playoffPresentation.complete && currentPlayoffSeries">
                  <h3 class="text-2xl font-black text-zinc-950 dark:text-white uppercase mb-4">{{ label('rounds', currentPlayoffSeries.round) }} vs {{ currentPlayoffSeries.opponentTeamId }}</h3>
                  <div v-if="revealedCurrentPlayoffGames.length" class="overflow-x-auto mb-4">
                    <table class="w-full min-w-190 text-xs text-center">
                      <thead class="text-[9px] text-gray-500 uppercase tracking-widest">
                        <tr>
                          <th class="px-2 py-2 text-left">{{ t('game') }}</th>
                          <th class="px-2 py-2">{{ t('result') }}</th>
                          <th class="px-2 py-2">{{ t('court') }}</th>
                          <th class="px-2 py-2">PTS</th>
                          <th class="px-2 py-2">REB</th>
                          <th class="px-2 py-2">AST</th>
                          <th class="px-2 py-2">STL</th>
                          <th class="px-2 py-2">BLK</th>
                          <th class="px-2 py-2">FG%</th>
                          <th class="px-2 py-2">3PT%</th>
                          <th class="px-2 py-2">FT%</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="game in revealedCurrentPlayoffGames" :key="game.gameNumber" class="bg-stone-100 dark:bg-zinc-900 border-t border-black/10 dark:border-white/10">
                          <td class="px-2 py-2 text-left text-zinc-600 dark:text-zinc-400">{{ t('game') }} {{ game.gameNumber }}</td>
                          <td :class="game.won ? 'text-green-500' : 'text-red-500'" class="px-2 py-2 font-black">{{ label('results', game.won ? 'W' : 'L') }}</td>
                          <td class="px-2 py-2 text-zinc-600 dark:text-zinc-400">{{ label('locations', game.home ? 'HOME' : 'AWAY') }}</td>
                          <td class="px-2 py-2 font-black text-zinc-950 dark:text-white">{{ game.points }}</td>
                          <td class="px-2 py-2 text-zinc-950 dark:text-white">{{ game.rebounds }}</td>
                          <td class="px-2 py-2 text-zinc-950 dark:text-white">{{ game.assists }}</td>
                          <td class="px-2 py-2 text-zinc-950 dark:text-white">{{ game.steals }}</td>
                          <td class="px-2 py-2 text-zinc-950 dark:text-white">{{ game.blocks }}</td>
                          <td class="px-2 py-2 text-zinc-600 dark:text-zinc-400">{{ formatPercentage(game.fgPct) }}</td>
                          <td class="px-2 py-2 text-zinc-600 dark:text-zinc-400">{{ formatPercentage(game.fg3Pct) }}</td>
                          <td class="px-2 py-2 text-zinc-600 dark:text-zinc-400">{{ formatPercentage(game.ftPct) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      :disabled="playoffPresentation.mode === 'games' && playoffPresentation.currentGame > 0"
                      class="bg-amber-400 dark:bg-red-500 disabled:opacity-30 text-black dark:text-white font-black py-4 rounded uppercase tracking-widest text-xs"
                      @click="simulateNextPlayoffSeries"
                    >
                      {{ t('simulateSeries') }}
                    </button>
                    <button class="border border-amber-500 dark:border-red-500 text-amber-700 dark:text-red-400 font-black py-4 rounded uppercase tracking-widest text-xs" @click="simulateNextPlayoffGame">
                      {{ t('simulateGame') }}
                    </button>
                  </div>
                  <p v-if="playoffPresentation.mode === 'games'" class="text-gray-600 text-[9px] uppercase mt-2">{{ t('gameLocked') }}</p>
                </div>
                <div v-else>
                  <h3 class="text-2xl font-black text-zinc-950 dark:text-white uppercase mb-4">{{ t('playoffsComplete') }}</h3>
                  <button class="w-full bg-amber-400 dark:bg-red-500 text-black dark:text-white font-black py-4 rounded uppercase tracking-widest" @click="finishPlayoffPresentation">{{ t('continue') }}</button>
                </div>
                <div v-if="completedPlayoffSeries.length" class="mt-4 pt-4 border-t border-black/10 dark:border-white/10 space-y-1">
                  <div v-for="series in completedPlayoffSeries" :key="series.round" class="flex justify-between text-xs">
                    <span class="text-gray-500">{{ label('rounds', series.round) }} vs {{ series.opponentTeamId }}</span>
                    <span class="text-zinc-950 dark:text-white font-black">{{ series.wins }}-{{ series.losses }}</span>
                  </div>
                </div>
              </div>

              <div v-else-if="player.isRetired">
                <h3 class="text-2xl font-black text-zinc-950 dark:text-white uppercase text-center mb-4">{{ t('careerEnded') }}</h3>
                <button @click="viewLegacy" class="w-full bg-amber-400 dark:bg-red-500 hover:bg-amber-300 dark:hover:bg-red-400 text-black dark:text-white font-black py-4 rounded-lg transition-colors uppercase tracking-widest">{{ t('viewLegacy') }}</button>
              </div>
              
              <div v-else-if="isFreeAgent">
                <div class="flex justify-between items-center mb-4">
                  <p class="text-amber-700 dark:text-red-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <span class="w-2 h-2 bg-amber-400 dark:bg-red-500 rounded-full animate-pulse"></span> {{ t('transferWindow') }}
                  </p>
                  <p class="text-gray-500 text-[10px] font-bold uppercase">{{ player.age }} {{ t('yearsOld') }}</p>
                </div>
                
                <h3 class="text-2xl font-black text-zinc-950 dark:text-white uppercase mb-6 leading-none">{{ t('contractExpired') }}</h3>
                
                <div v-if="freeAgencyOffers.length === 0" class="text-center">
                  <button @click="generateOffers" class="w-full bg-amber-400 dark:bg-red-500 hover:bg-amber-300 dark:hover:bg-red-400 text-black dark:text-white font-black py-4 rounded-lg transition-colors uppercase tracking-widest text-sm">
                    {{ t('listenOffers') }}
                  </button>
                </div>
                
                <div v-else class="space-y-3">
                  <button 
                    v-for="(offer, idx) in freeAgencyOffers" 
                    :key="idx"
                    @click="acceptOffer(offer)"
                    class="w-full bg-stone-50 dark:bg-zinc-900 border border-black/10 dark:border-white/10 hover:border-amber-500 dark:hover:border-red-500 rounded-lg p-4 flex justify-between items-center transition-all group"
                  >
                    <div class="text-left flex items-center gap-4">
                      <div class="w-10 h-10 bg-zinc-100 dark:bg-black border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center text-xs font-black text-zinc-950 dark:text-white group-hover:border-amber-500 dark:hover:border-red-500 transition-colors">
                        {{ offer.teamId }}
                      </div>
                      <div>
                        <p class="mb-1 text-lg font-black uppercase leading-none text-zinc-950 transition-colors group-hover:text-amber-700 dark:text-white dark:group-hover:text-red-400">{{ offer.teamId === player.teamId ? tf('stayAt', { team: offer.teamId }) : offer.teamId }}</p>
                        <p class="text-gray-500 text-[9px] uppercase font-bold tracking-widest">{{ label('roles', offer.role) }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="text-amber-700 dark:text-red-400 font-black text-lg leading-none mb-1">${{ offer.salary }}M <span class="text-gray-500 text-[10px] font-normal">/{{ t('year') }}</span></p>
                      <p class="text-zinc-600 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-widest">{{ offer.years }} {{ offer.years === 1 ? t('year') : t('years') }}</p>
                    </div>
                  </button>
                </div>
              </div>

              <div v-else class="text-center">
                <p class="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">
                  {{ t('contract') }}: {{ player.contractYearsLeft }} {{ t('yearsLeft') }}
                </p>
                <div class="grid gap-3 sm:grid-cols-2">
                  <button
                    class="min-h-16 rounded-xl bg-amber-400 px-5 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:-translate-y-0.5 hover:bg-amber-300 dark:bg-red-500 dark:text-white dark:hover:bg-red-400"
                    @click="simulateSeason"
                  >
                    {{ t('simulateSeason') }}
                  </button>
                  <button
                    :disabled="player.contractYearsLeft === 0"
                    class="min-h-16 rounded-xl border border-black/15 bg-zinc-950 px-5 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                    @click="simulateRemainingCareer"
                  >
                    {{ t('simulateCareer') }}
                  </button>
                </div>
                <div class="mt-4 border-t border-black/10 dark:border-white/10 pt-4">
                  <div class="flex gap-2">
                    <select
                      v-if="canChooseTradeTarget"
                      v-model="selectedTradeTeam"
                      :disabled="player.tradeRequestedThisSeason"
                      class="min-w-0 flex-1 bg-stone-100 dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded px-3 text-xs text-zinc-950 dark:text-white disabled:opacity-40"
                      aria-label="Preferred trade destination"
                    >
                      <option value="">{{ t('preferredTeam') }}</option>
                      <option v-for="team in tradeTargets" :key="team.id" :value="team.id">{{ team.id }}</option>
                    </select>
                    <button
                      :disabled="player.tradeRequestedThisSeason"
                      class="flex-1 border border-zinc-300 dark:border-zinc-700 disabled:opacity-40 text-zinc-700 dark:text-zinc-300 font-black px-4 py-3 rounded uppercase tracking-widest text-[10px]"
                      @click="submitTradeRequest"
                    >
                      {{ t('requestTrade') }}
                    </button>
                  </div>
                  <p v-if="lastTransactionMessage" class="text-gray-500 text-[10px] mt-2">{{ localizeDynamicText(lastTransactionMessage) }}</p>
                </div>
                <button v-if="player.age >= 32" @click="retireManual" class="w-full mt-4 bg-transparent border border-black/10 dark:border-white/10 hover:border-red-900 hover:bg-red-900/10 text-gray-600 hover:text-red-500 font-bold py-3 rounded-lg transition-colors uppercase tracking-widest text-xs">
                  {{ t('retire') }}
                </button>
              </div>
            </div>

            <!-- Feed de Imprensa -->
            <div class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 rounded-xl p-6">
              <h4 class="text-zinc-950 dark:text-white font-black uppercase tracking-widest text-sm mb-4 border-b border-black/10 dark:border-white/10 pb-2">{{ t('press') }}</h4>
              <ul class="space-y-4">
                <li v-for="(news, index) in newsFeed" :key="index" class="flex gap-4 text-sm">
                  <span class="text-amber-700 dark:text-red-400 font-bold opacity-80">{{ player.age }} {{ t('ageSuffix') }}</span>
                  <span class="text-zinc-700 dark:text-zinc-300">{{ news }}</span>
                </li>
              </ul>
            </div>
            
            <!-- Últimos prêmios -->
            <div v-if="lastSeason && lastSeason.awards.length > 0 && !playoffPresentation.active" class="flex flex-wrap gap-2">
              <div v-for="award in lastSeason.awards" :key="award" class="bg-amber-400/10 dark:bg-red-500/10 border border-amber-500/30 dark:border-red-500/30 text-amber-700 dark:text-red-400 font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded">
                {{ label('awards', award) }}
              </div>
            </div>

          </div>

          <div class="rounded-2xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-950 sm:p-7 lg:col-span-12">
            <h4 class="mb-6 border-b border-black/10 pb-4 text-sm font-black uppercase tracking-widest text-zinc-950 dark:border-white/10 dark:text-white">{{ t('standings') }}</h4>
            <div class="grid gap-8 md:grid-cols-2">
              <div>
                <p class="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{{ t('eastern') }}</p>
                <div class="grid gap-1">
                  <div
                    v-for="(team, idx) in easternTeams"
                    :key="team.id"
                    class="grid grid-cols-[2rem_1fr_auto] items-center rounded-lg px-3 py-2 text-xs even:bg-stone-100 dark:even:bg-zinc-900"
                  >
                    <span class="font-mono text-gray-500">{{ (idx as number) + 1 }}</span>
                    <span :class="team.id === player.teamId ? 'font-black text-amber-700 dark:text-red-400' : 'font-bold text-zinc-700 dark:text-zinc-300'">{{ team.id }}</span>
                    <span class="font-mono text-gray-500">{{ team.wins }}-{{ team.losses }}</span>
                  </div>
                </div>
              </div>
              <div>
                <p class="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{{ t('western') }}</p>
                <div class="grid gap-1">
                  <div
                    v-for="(team, idx) in westernTeams"
                    :key="team.id"
                    class="grid grid-cols-[2rem_1fr_auto] items-center rounded-lg px-3 py-2 text-xs even:bg-stone-100 dark:even:bg-zinc-900"
                  >
                    <span class="font-mono text-gray-500">{{ (idx as number) + 1 }}</span>
                    <span :class="team.id === player.teamId ? 'font-black text-amber-700 dark:text-red-400' : 'font-bold text-zinc-700 dark:text-zinc-300'">{{ team.id }}</span>
                    <span class="font-mono text-gray-500">{{ team.wins }}-{{ team.losses }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Active League Awards -->
            <div v-if="lastSeason && lastSeason.leagueAwards" class="mt-6 border-t border-black/10 pt-5 dark:border-white/10">
              <p class="text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-2">{{ t('seasonLeaders') }}</p>
              <div class="grid gap-3 text-xs sm:grid-cols-2 lg:grid-cols-4">
                <div class="flex justify-between"><span class="text-zinc-600 dark:text-zinc-400 font-bold">MVP</span> <span class="text-amber-700 dark:text-red-400 font-black">{{ lastSeason.leagueAwards.MVP }}</span></div>
                <div class="flex justify-between"><span class="text-zinc-600 dark:text-zinc-400 font-bold">DPOY</span> <span class="text-zinc-950 dark:text-white font-black">{{ lastSeason.leagueAwards.DPOY }}</span></div>
                <div class="flex justify-between"><span class="text-zinc-600 dark:text-zinc-400 font-bold">SMOTY</span> <span class="text-zinc-950 dark:text-white font-black">{{ lastSeason.leagueAwards.SMOTY }}</span></div>
                <div v-if="lastSeason.playoffs?.championTeamId && !playoffPresentation.active" class="flex justify-between"><span class="text-zinc-600 dark:text-zinc-400 font-bold">FMVP</span> <span class="text-zinc-950 dark:text-white font-black">{{ lastSeason.leagueAwards.FMVP }}</span></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- FASE 5: O LEGADO (APOSENTADORIA) -->
      <section v-if="currentPhase === 'retired'" class="max-w-5xl mx-auto pb-12 animate-fade-in">
        
        <!-- Cabeçalho do Legado -->
        <div class="mb-10 grid gap-5 border-b border-black/10 pb-8 dark:border-white/10 sm:grid-cols-[auto_1fr] sm:items-center">
          <div class="min-w-32 rounded-2xl border border-black/10 bg-white p-6 text-center dark:border-white/10 dark:bg-zinc-950">
            <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{{ t('careerScore') }}</p>
            <p class="text-5xl font-black text-amber-700 dark:text-red-400">{{ goatEvaluation.score }}</p>
          </div>
          <div class="min-w-0">
            <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">{{ t('careerEnded') }}</p>
            <h1 class="text-4xl font-black text-zinc-950 dark:text-white uppercase tracking-tight">{{ label('tiers', goatEvaluation.tier) }}</h1>
            <p class="text-zinc-600 dark:text-zinc-400 text-sm mt-2 font-bold">{{ label('positions', player.position) }} · {{ history.length }} {{ history.length === 1 ? t('seasonSingular') : t('seasonPlural') }}</p>
            <p v-if="player.retirementReason" class="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2">{{ label('injuries', player.retirementReason) }}</p>
          </div>

          <div class="min-w-0 sm:col-span-2">
            <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">{{ t('careerAverages') }}</p>
            <div class="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
              <div v-for="[label, value] in [
                ['PPG', careerAverages.ppg.toFixed(1)], ['RPG', careerAverages.rpg.toFixed(1)],
                ['APG', careerAverages.apg.toFixed(1)], ['SPG', careerAverages.spg.toFixed(1)],
                ['BPG', careerAverages.bpg.toFixed(1)],
                ['FG%', formatPercentage(careerAverages.fgPct)],
                ['3P%', formatPercentage(careerAverages.fg3Pct)],
                ['FT%', formatPercentage(careerAverages.ftPct)]
              ]" :key="label" class="min-w-0 rounded-lg border border-black/10 bg-white p-3 text-center dark:border-white/10 dark:bg-zinc-950">
                <p class="text-zinc-950 dark:text-white font-black">{{ value }}</p>
                <p class="text-gray-600 text-[8px] font-black uppercase">{{ label }}</p>
              </div>
            </div>
          </div>

          <div v-if="retiredJerseys.length" class="min-w-0 sm:col-span-2">
            <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">{{ t('retiredJerseys') }}</p>
            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div v-for="jersey in retiredJerseys" :key="jersey.teamId" class="min-w-0 rounded-xl border border-amber-500 bg-amber-400/10 p-5 text-center dark:border-red-500/40 dark:bg-red-500/10">
                <p class="text-zinc-600 dark:text-zinc-400 text-[10px] font-black uppercase">{{ jersey.teamId }}</p>
                <p class="text-4xl text-amber-700 dark:text-red-400 font-black">#{{ jersey.jerseyNumber }}</p>
                <p class="text-gray-500 text-[9px] uppercase">{{ jersey.seasons }} {{ t('seasons') }} · {{ jersey.rings }} {{ t('rings') }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          
          <!-- Números da Carreira (Totais) -->
          <div>
            <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">{{ t('careerTotals') }}</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white dark:bg-zinc-950 border border-amber-500/30 dark:border-red-500/30 p-6 rounded-lg text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-amber-400/5 dark:bg-red-500/5"></div>
                <p class="relative z-10 mb-1 text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-red-400">{{ t('points') }}</p>
                <p class="text-3xl font-black text-amber-700 dark:text-red-400 relative z-10">{{ careerTotals.totalPoints }}</p>
              </div>
              <div class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 p-6 rounded-lg text-center">
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{{ t('rebounds') }}</p>
                <p class="text-3xl font-black text-zinc-950 dark:text-white">{{ careerTotals.totalRebounds }}</p>
              </div>
              <div class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 p-6 rounded-lg text-center">
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{{ t('assists') }}</p>
                <p class="text-3xl font-black text-zinc-950 dark:text-white">{{ careerTotals.totalAssists }}</p>
              </div>
              <div class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 p-6 rounded-lg text-center">
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">{{ t('games') }}</p>
                <p class="text-3xl font-black text-zinc-950 dark:text-white">{{ careerTotals.gamesPlayed }}</p>
              </div>
            </div>
          </div>

          <!-- Comparações com carreiras reais -->
          <div class="mt-8">
            <div class="flex justify-between items-end mb-3">
              <p class="text-gray-500 text-xs font-bold uppercase tracking-widest">{{ t('comparisons') }}</p>
              <p class="text-amber-700 dark:text-red-400 text-[10px] font-black uppercase tracking-widest">{{ t('closestProfiles') }}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <article
                v-for="(comparison, index) in careerComparisons"
                :key="comparison.player.id"
                class="bg-white dark:bg-zinc-950 border rounded-xl p-5"
                :class="index === 0 ? 'border-amber-500 dark:border-red-500/60' : 'border-black/10 dark:border-white/10'"
              >
                <div class="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p class="text-gray-500 text-[9px] font-bold uppercase tracking-widest">
                      {{ index === 0 ? t('closestCareer') : tf('alternative', { number: index + 1 }) }}
                    </p>
                    <h2 class="text-zinc-950 dark:text-white text-lg font-black uppercase mt-1">{{ comparison.player.name }}</h2>
                    <p class="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
                      {{ comparison.player.positions.map(position => label('positions', position)).join('/') }} · {{ comparison.player.era }}
                    </p>
                    <p class="text-gray-700 text-[9px] font-bold uppercase tracking-widest mt-1">
                      {{ comparison.basis === 'complete' ? t('fullLegacy') : t('statisticalProfile') }}
                    </p>
                  </div>
                  <span class="text-amber-700 dark:text-red-400 text-2xl font-black">{{ comparison.similarity }}%</span>
                </div>
                <p class="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed mb-4">{{ tf('careerSnapshot', { seasons: comparison.player.seasons, points: comparison.player.points.toLocaleString(locale), rings: comparison.player.rings }) }}</p>
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  {{ t('similar') }}: <span class="text-zinc-700 dark:text-zinc-300">{{ comparison.sharedTraits.map(trait => label('dimensions', trait)).join(' · ') }}</span>
                </p>
                <p class="text-gray-600 text-[10px] mt-2">{{ localizeComparisonDifference(comparison.mainDifference) }}</p>
              </article>
            </div>
          </div>

          <!-- Linha do Tempo de Clubes -->
          <div class="mt-8">
            <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">{{ t('careerPath') }}</p>
            <div class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 p-4 rounded-lg flex flex-wrap items-center gap-3">
              <template v-for="(stop, index) in formattedTimeline" :key="index">
                <div class="flex items-center gap-2">
                  <span class="text-zinc-950 dark:text-white font-black uppercase text-sm">{{ stop.teamId }}</span>
                  <span class="text-gray-500 text-[10px] font-bold uppercase tracking-widest">({{ stop.period }})</span>
                </div>
                <span v-if="!stop.isLast" class="text-amber-700 dark:text-red-400 text-xs font-black">→</span>
              </template>
            </div>
          </div>

          <!-- Armário de Troféus -->
          <div>
            <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3 mt-8">{{ t('trophyCabinet') }}</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- Rings -->
              <div class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 p-4 rounded-lg flex items-center justify-between">
                <span class="text-zinc-950 dark:text-white text-sm font-black uppercase tracking-widest">{{ t('rings') }}</span>
                <span class="text-amber-700 dark:text-red-400 font-black">x{{ trophyCabinet['Rings'] || 0 }}</span>
              </div>
              <!-- MVP -->
              <div class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 p-4 rounded-lg flex items-center justify-between">
                <span class="text-zinc-950 dark:text-white text-sm font-black uppercase tracking-widest">⭐ MVP</span>
                <span class="text-amber-700 dark:text-red-400 font-black">x{{ trophyCabinet['MVP'] || 0 }}</span>
              </div>
              <!-- Finals MVP -->
              <div class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 p-4 rounded-lg flex items-center justify-between">
                <span class="text-zinc-950 dark:text-white text-sm font-black uppercase tracking-widest">FMVP</span>
                <span class="text-amber-700 dark:text-red-400 font-black">x{{ trophyCabinet['Finals MVP'] || 0 }}</span>
              </div>
              <!-- DPOY -->
              <div class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 p-4 rounded-lg flex items-center justify-between">
                <span class="text-zinc-950 dark:text-white text-sm font-black uppercase tracking-widest">DPOY</span>
                <span class="text-amber-700 dark:text-red-400 font-black">x{{ trophyCabinet['DPOY'] || 0 }}</span>
              </div>
            </div>
            
            <!-- Outros Prêmios -->
            <div class="flex flex-wrap gap-2 mt-4">
              <div 
                v-for="[award, count] in sortedAwards" 
                :key="award" 
                class="bg-stone-100 dark:bg-zinc-900 border border-black/10 dark:border-white/10 px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400"
              >
                {{ label('awards', award) }} <span class="text-zinc-950 dark:text-white ml-1">x{{ count }}</span>
              </div>
            </div>
          </div>

          <!-- Recordes e Comparação Histórica -->
          <div class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 rounded-xl p-6 mt-8">
            <div class="flex justify-between items-end mb-6 border-b border-black/10 dark:border-white/10 pb-3">
              <p class="text-gray-500 text-xs font-bold uppercase tracking-widest">{{ t('records') }}</p>
              <p class="text-amber-700 dark:text-red-400 text-[10px] font-black uppercase tracking-widest">{{ t('allTime') }}</p>
            </div>

            <div class="space-y-5">
              <!-- Barra de Pontos -->
              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-zinc-950 dark:text-white">{{ t('points') }}</span>
                  <span class="text-gray-500"><span class="text-amber-700 dark:text-red-400">{{ careerTotals.totalPoints }}</span> / {{ nbaRecords.points }} (LeBron James)</span>
                </div>
                <div class="w-full bg-stone-100 dark:bg-zinc-900 rounded-full h-1.5">
                  <div class="bg-amber-400 dark:bg-red-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(careerTotals.totalPoints, nbaRecords.points)}%`"></div>
                </div>
              </div>

              <!-- Barra de Assistências -->
              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-zinc-950 dark:text-white">{{ t('assists') }}</span>
                  <span class="text-gray-500"><span class="text-green-500">{{ careerTotals.totalAssists }}</span> / {{ nbaRecords.assists }} (John Stockton)</span>
                </div>
                <div class="w-full bg-stone-100 dark:bg-zinc-900 rounded-full h-1.5">
                  <div class="bg-green-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(careerTotals.totalAssists, nbaRecords.assists)}%`"></div>
                </div>
              </div>

              <!-- Barra de Rebotes -->
              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-zinc-950 dark:text-white">{{ t('rebounds') }}</span>
                  <span class="text-gray-500"><span class="text-blue-500">{{ careerTotals.totalRebounds }}</span> / {{ nbaRecords.rebounds }} (Wilt Chamberlain)</span>
                </div>
                <div class="w-full bg-stone-100 dark:bg-zinc-900 rounded-full h-1.5">
                  <div class="bg-blue-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(careerTotals.totalRebounds, nbaRecords.rebounds)}%`"></div>
                </div>
              </div>

              <!-- Barra de Steals -->
              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-zinc-950 dark:text-white">{{ t('steals') }}</span>
                  <span class="text-gray-500"><span class="text-purple-500">{{ careerTotals.totalSteals || 0 }}</span> / {{ nbaRecords.steals }} (John Stockton)</span>
                </div>
                <div class="w-full bg-stone-100 dark:bg-zinc-900 rounded-full h-1.5"><div class="bg-purple-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(careerTotals.totalSteals || 0, nbaRecords.steals)}%`"></div></div>
              </div>

              <!-- Barra de Blocks -->
              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-zinc-950 dark:text-white">{{ t('blocks') }}</span>
                  <span class="text-gray-500"><span class="text-red-500">{{ careerTotals.totalBlocks || 0 }}</span> / {{ nbaRecords.blocks }} (Hakeem Olajuwon)</span>
                </div>
                <div class="w-full bg-stone-100 dark:bg-zinc-900 rounded-full h-1.5"><div class="bg-red-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(careerTotals.totalBlocks || 0, nbaRecords.blocks)}%`"></div></div>
              </div>

              <!-- Barra de MVPs -->
              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-zinc-950 dark:text-white">{{ t('mvpAwards') }}</span>
                  <span class="text-gray-500"><span class="text-amber-700 dark:text-red-400">{{ trophyCabinet['MVP'] || 0 }}</span> / {{ nbaRecords.mvps }} (Kareem Abdul-Jabbar)</span>
                </div>
                <div class="w-full bg-stone-100 dark:bg-zinc-900 rounded-full h-1.5"><div class="bg-amber-400 dark:bg-red-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(trophyCabinet['MVP'] || 0, nbaRecords.mvps)}%`"></div></div>
              </div>

              <!-- Barra de Títulos -->
              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-zinc-950 dark:text-white">{{ t('championships') }}</span>
                  <span class="text-gray-500"><span class="text-purple-500">{{ trophyCabinet['Rings'] || 0 }}</span> / {{ nbaRecords.rings }} (Bill Russell)</span>
                </div>
                <div class="w-full bg-stone-100 dark:bg-zinc-900 rounded-full h-1.5">
                  <div class="bg-purple-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(trophyCabinet['Rings'] || 0, nbaRecords.rings)}%`"></div>
                </div>
              </div>

              <div class="mt-4">
                <div class="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                  <span class="text-zinc-950 dark:text-white">{{ t('dpoyAwards') }}</span>
                  <span class="text-gray-500"><span class="text-blue-500">{{ trophyCabinet['DPOY'] || 0 }}</span> / 4 (Mutombo/Wallace/Gobert)</span>
                </div>
                <div class="w-full bg-stone-100 dark:bg-zinc-900 rounded-full h-1.5"><div class="bg-blue-500 h-1.5 rounded-full" :style="`width: ${getRecordPercentage(trophyCabinet['DPOY'] || 0, 4)}%`"></div></div>
              </div>
            </div>
          </div>

          <!-- Tabela de Histórico (Year-by-Year) -->
          <div class="mt-8 mb-12">
            <p class="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">{{ t('yearByYear') }}</p>
            <div class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 rounded-xl overflow-x-auto">
              <table class="w-full text-left border-collapse table-fixed whitespace-nowrap">
                <caption class="sr-only">{{ t('tableCaption') }}</caption>
                <thead>
                  <tr class="bg-stone-100 dark:bg-zinc-900/50 border-b border-black/10 dark:border-white/10 text-[9px] text-gray-500 uppercase tracking-widest font-black">
                    <th class="py-2 px-2 w-8 text-center">{{ t('yearShort') }}</th>
                    <th class="py-2 px-2 w-10 text-center">{{ t('teamShort') }}</th>
                    <th class="py-2 px-2 w-8 text-center">{{ t('ageShort') }}</th>
                    <th class="py-2 px-2 w-8 text-center">OV</th>
                    <th class="py-2 px-2 w-8 text-center">G</th>
                    <th class="py-2 px-2 w-10 text-center">PTS</th>
                    <th class="py-2 px-2 w-10 text-center">REB</th>
                    <th class="py-2 px-2 w-10 text-center">AST</th>
                    <th class="py-2 px-2 w-10 text-center">STL</th>
                    <th class="py-2 px-2 w-10 text-center">BLK</th>
                    <th class="py-2 px-2 w-10 text-center">TOV</th>
                    <th class="py-2 px-2 w-10 text-center">FG%</th>
                    <th class="py-2 px-2 w-10 text-center">3P%</th>
                    <th class="py-2 px-2 w-10 text-center">FT%</th>
                    <th class="py-2 px-2 w-10 text-center">+/-</th>
                    <th class="py-2 px-2 text-left">{{ t('awardsNotes') }}</th>
                  </tr>
                </thead>
                <tbody class="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 font-mono">
                  <tr v-for="season in history" :key="season.seasonNumber" 
                      :class="season.seasonNumber === bestSeasonNumber ? 'bg-amber-400/10 dark:bg-red-500/10 border-l-2 border-amber-500 dark:border-red-500' : 'border-b border-black/10 hover:bg-stone-100 dark:border-white/5 dark:hover:bg-zinc-900/40'"
                      class="transition-colors h-8">
                    <td class="py-1 px-2 text-center text-gray-500">{{ season.seasonNumber }}</td>
                    <td class="py-1 px-2 text-center text-zinc-950 dark:text-white font-black font-sans">{{ season.teamId }}</td>
                    <td class="py-1 px-2 text-center">{{ season.age }}</td>
                    <td class="py-1 px-2 text-center text-amber-700 dark:text-red-400">{{ season.ovr }}</td>
                    <td class="py-1 px-2 text-center">{{ season.gamesPlayed ?? 82 }}</td>
                    <td class="py-1 px-2 text-center text-zinc-950 dark:text-white">{{ season.ppg.toFixed(1) }}</td>
                    <td class="py-1 px-2 text-center">{{ season.rpg.toFixed(1) }}</td>
                    <td class="py-1 px-2 text-center">{{ season.apg.toFixed(1) }}</td>
                    <td class="py-1 px-2 text-center">{{ season.spg.toFixed(1) }}</td>
                    <td class="py-1 px-2 text-center">{{ season.bpg.toFixed(1) }}</td>
                    <td class="py-1 px-2 text-center">{{ season.tov.toFixed(1) }}</td>
                    <td class="py-1 px-2 text-center">{{ formatPercentage(season.fgPct) }}</td>
                    <td class="py-1 px-2 text-center">{{ formatPercentage(season.fg3Pct) }}</td>
                    <td class="py-1 px-2 text-center">{{ formatPercentage(season.ftPct) }}</td>
                    <td class="py-1 px-2 text-center">{{ season.plusMinus.toFixed(1) }}</td>
                    <td class="truncate px-2 py-1 font-sans text-[8px] uppercase tracking-widest text-amber-700 dark:text-red-400">
                      {{ season.playoffs?.wonRing ? `${t('ring')} | ` : '' }}  {{ season.injury ? label('injuries', season.injury.name) + ` | ` : '' }} {{ season.awards.map(award => label('awards', award)).join(' | ') }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Atributos Originais e Botão -->
          <div class="pt-4 text-center">
            <div class="bg-stone-100 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 rounded-xl p-6 mb-8 inline-block max-w-3xl w-full text-left">
              <div class="flex justify-between items-center mb-4">
                <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{{ t('originalDna') }}</p>
                <p class="text-green-500 text-sm font-black uppercase tracking-widest">{{ t('earnings') }}: ${{ careerTotals.totalEarnings || 0 }}M</p>
              </div>
              <div class="flex flex-wrap gap-2">
                <div v-for="(data, attr) in player.originalDNA" :key="attr" class="relative flex flex-col items-center justify-center overflow-hidden rounded-lg border border-black/10 bg-white p-3 text-center dark:border-white/10 dark:bg-[#111]">
    
                <span class="text-amber-700 dark:text-red-400 text-[10px] font-black uppercase tracking-widest mb-1">{{ label('attributes', attr) }}</span>
                
                <span class= "text-zinc-600 dark:text-zinc-400 text-sm font-bold truncate w-full z-10">{{ data.player }}</span>
                
                <span class=" text-zinc-950 dark:text-white text-xs font-mono mt-1 font-bold z-10">
                  {{ data.value ? data.value : '?' }}
                </span>
                
              </div>
              </div>
            </div>
            
            <br/>
            <button @click="resetGame" class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 hover:border-amber-500 dark:hover:border-red-500 text-zinc-950 dark:text-white font-black py-4 px-12 rounded-full transition-colors uppercase tracking-widest text-sm mb-12">
              {{ t('newCareer') }}
            </button>
          </div>
        </div>
      </section>

    </div>
  </main>

  <!-- OVERLAY DE MILESTONES (POP-UP) -->
  <div
    v-if="pendingMilestones.length > 0"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="milestone-title"
    aria-describedby="milestone-description"
    @keydown.esc="dismissMilestone"
  >
    <div class="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 rounded-xl p-10 max-w-md w-full text-center shadow-2xl animate-fade-in relative overflow-hidden">
      <div class="absolute inset-0 bg-amber-400/5 dark:bg-red-500/5 blur-3xl z-0 pointer-events-none"></div>

      <div class="relative z-10">
        <div class="flex justify-between items-center mb-8 border-b border-black/10 dark:border-white/10 pb-3">
          <p class="text-amber-700 dark:text-red-400 text-[10px] font-black uppercase tracking-widest">{{ t('breakingNews') }}</p>
          <p class="text-gray-600 text-[10px] font-bold uppercase tracking-widest">{{ t('season') }} {{ history.length }}</p>
        </div>

        <div class="text-6xl mb-6" aria-hidden="true">{{ pendingMilestones[0].icon }}</div>
        <h2 id="milestone-title" class="text-2xl font-black text-zinc-950 dark:text-white uppercase mb-3 leading-tight">
          {{ localizeDynamicText(pendingMilestones[0].title) }}
        </h2>
        <p id="milestone-description" class="text-zinc-600 dark:text-zinc-400 text-sm font-bold uppercase tracking-widest mb-10">
          {{ localizeDynamicText(pendingMilestones[0].subtitle) }}
        </p>

        <button
          ref="milestoneButton"
          type="button"
          class="w-full bg-amber-400 dark:bg-red-500 hover:bg-amber-300 dark:hover:bg-red-400 text-black dark:text-white font-black py-4 px-12 rounded-lg transition-colors uppercase tracking-widest text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          @click="dismissMilestone"
        >
          {{ t('continue') }}
        </button>
      </div>
    </div>
  </div>
</template>
