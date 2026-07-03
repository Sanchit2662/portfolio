// All editable portfolio content lives here.

export const PROFILE = {
  name: 'Sanchit Kumar',
  handle: 'sanchit',
  host: 'cloud',
  githubUser: 'Sanchit2662',
  title: 'software engineer',
  tagline:
    'Software engineer building across the stack — distributed systems, cloud infrastructure and on-chain tooling. LFX Mentee 2026, with 50+ PRs merged across CNCF projects along the way.',
  links: {
    github: 'https://github.com/Sanchit2662',
    linkedin: 'https://www.linkedin.com/in/sanchit-kumar-134297249/',
    email: 'sanchit2662@gmail.com',
  },
}

// Experience section (rendered as `cat experience.log`).
export const EXPERIENCE = [
  {
    role: 'lfx mentee',
    org: 'cloud native computing foundation',
    period: 'jun 2026 — aug 2026',
    desc: 'selected mentee, LFX mentorship program · term 2, 2026',
  },
  {
    role: 'open-source contributor',
    org: 'cncf ecosystem',
    period: 'jan 2025 — present',
    desc: '50+ PRs merged across prometheus-operator, kubescape & volcano',
  },
]

// Contributions proof — collapsed under "proof > claims" in the experience section.
export const OSS = {
  stats: [
    { value: '50+', label: 'PRs merged in CNCF' },
    { value: '3', label: 'CNCF projects' },
    { value: '2026', label: 'LFX Mentee, Term 2' },
  ],
  orgs: [
    {
      name: 'prometheus-operator',
      desc: 'kubernetes-native prometheus management',
      prs: 'https://github.com/search?q=org%3Aprometheus-operator+author%3ASanchit2662+is%3Amerged&type=pullrequests',
    },
    {
      name: 'kubescape',
      desc: 'kubernetes security platform',
      prs: 'https://github.com/search?q=org%3Akubescape+author%3ASanchit2662+is%3Amerged&type=pullrequests',
    },
    {
      name: 'volcano-sh',
      desc: 'batch scheduling for kubernetes',
      prs: 'https://github.com/search?q=org%3Avolcano-sh+author%3ASanchit2662+is%3Amerged&type=pullrequests',
    },
  ],
}

// Skills rendered as a `tree skills/` listing — directories are collapsible.
export const SKILL_TREE = [
  {
    dir: 'languages',
    items: ['go', 'python', 'typescript', 'javascript'],
  },
  {
    dir: 'cloud-native',
    items: ['kubernetes', 'prometheus', 'docker', 'helm', 'grpc'],
  },
  {
    dir: 'blockchain',
    items: ['bitcoin-core', 'psbt', 'on-chain-analytics'],
  },
  {
    dir: 'systems',
    items: ['linux', 'git', 'ci-cd', 'ebpf'],
  },
  {
    dir: 'learning',
    items: ['rust', 'zk-proofs'],
  },
]

// `repo` must match the GitHub repo name — live stars/forks are fetched by it.
// `about` + `stack` feed the terminal-style project popup.
export const PROJECTS = [
  {
    repo: 'sherlock-chain-analysis',
    desc: 'on-chain forensics — trace transactions, map wallet relationships',
    lang: 'typescript',
    url: 'https://github.com/Sanchit2662/sherlock-chain-analysis',
    about: [
      'On-chain forensics tool that traces transactions across the chain',
      'and maps wallet relationships into an explorable graph.',
    ],
    stack: ['TypeScript', 'Node.js', 'Graph viz', 'Blockchain APIs'],
  },
  {
    repo: 'bitcoin-psbt-builder',
    desc: 'construct, inspect and sign PSBTs in the browser',
    lang: 'bitcoin',
    url: 'https://github.com/Sanchit2662/bitcoin-psbt-builder',
    about: [
      'Construct, inspect and sign Partially Signed Bitcoin Transactions',
      'entirely in the browser — no keys ever leave the client.',
    ],
    stack: ['TypeScript', 'Bitcoin', 'PSBT (BIP-174)', 'Web Crypto'],
  },
  {
    repo: 'bitcoin-chain-lens',
    desc: 'real-time explorer for blocks, transactions and addresses',
    lang: 'typescript',
    url: 'https://github.com/Sanchit2662/bitcoin-chain-lens',
    about: [
      'A focused Bitcoin explorer for inspecting blocks, transactions',
      'and addresses in real time.',
    ],
    stack: ['TypeScript', 'Bitcoin RPC', 'REST', 'Real-time UI'],
  },
  {
    repo: 'markdown-graph-builder',
    desc: 'turns markdown notes into a linked knowledge graph',
    lang: 'javascript',
    url: 'https://github.com/Sanchit2662/markdown-graph-builder',
    about: [
      'Parses plain markdown notes and renders them as an interactive,',
      'linked knowledge graph.',
    ],
    stack: ['JavaScript', 'Markdown AST', 'Force-directed graph'],
  },
  {
    repo: 'carbon-footprint-calculator',
    desc: 'estimate and visualize your carbon footprint',
    lang: 'javascript',
    url: 'https://github.com/Sanchit2662/carbon-footprint-calculator',
    about: [
      'Estimate and visualize your carbon footprint with a clean,',
      'data-driven interface.',
    ],
    stack: ['JavaScript', 'DataViz', 'Sustainability'],
  },
  {
    repo: 'behaviour_lens',
    desc: 'go engine for behavioral signals at scale',
    lang: 'go',
    url: 'https://github.com/Sanchit2662/behaviour_lens',
    about: [
      'A Go-powered engine for capturing and analyzing behavioral',
      'signals at scale.',
    ],
    stack: ['Go', 'Concurrency', 'Analytics pipeline'],
  },
]
