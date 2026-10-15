import { useMemo, useState } from "react"

type Screen = "home" | "taste" | "mood" | "recommendation" | "player" | "discover" | "about" | "how" | "handoff"

type IconName = "arrow" | "check" | "heart" | "pause" | "play" | "previous" | "next" | "shuffle" | "repeat" | "queue" | "sparkle" | "arrowUp"

const genres = [
  "R&B",
  "Amapiano",
  "Hip-hop",
  "Pop",
  "Gospel",
  "Afro-soul",
  "House",
  "Jazz",
  "Rock",
  "Classical",
  "Lo-fi",
  "Electronic",
]

const moods = [
  {
    id: "happy",
    name: "Happy",
    emoji: "😊",
    description: "I'm feeling good and enjoying life.",
  },
  {
    id: "sad",
    name: "Sad",
    emoji: "😔",
    description: "I need music that understands me.",
  },
  {
    id: "calm",
    name: "Calm",
    emoji: "😌",
    description: "I want to relax and slow down.",
  },
  {
    id: "energetic",
    name: "Energetic",
    emoji: "⚡",
    description: "I'm ready to move and feel alive.",
  },
  {
    id: "angry",
    name: "Angry",
    emoji: "😤",
    description: "I need to release some energy.",
  },
  {
    id: "anxious",
    name: "Anxious or Overwhelmed",
    emoji: "🌧️",
    description: "I need something grounding.",
  },
  {
    id: "romantic",
    name: "Romantic",
    emoji: "💗",
    description: "I'm in a loving or affectionate mood.",
  },
  {
    id: "nostalgic",
    name: "Nostalgic",
    emoji: "🕰️",
    description: "I want songs that bring back memories.",
  },
  {
    id: "motivated",
    name: "Motivated",
    emoji: "🔥",
    description: "I need music to inspire me.",
  },
  {
    id: "numb",
    name: "Numb or Unsure",
    emoji: "🌫️",
    description: "I don't know how I feel right now.",
  },
] as const

type MoodId = typeof moods[number]["id"]

const recommendations: Record<MoodId, {
  title: string
  kicker: string
  message: string
  mix: string
  description: string
  track: string
  artist: string
}> = {
  happy: {
    title: "Your joy has a rhythm.",
    kicker: "SUNLIT & UNSTOPPABLE",
    message:
      "Bright hooks, warm basslines, and the kind of songs that make the whole day feel lighter.",
    mix: "Feel-Good Favourites",
    description: "Good energy, no skips",
    track: "Golden Hour",
    artist: "Mila Rae",
  },
  sad: {
    title: "Let the music understand.",
    kicker: "SOFT LANDING",
    message:
      "Tender songs for sitting with what you feel—without asking you to rush through it.",
    mix: "Songs for Your Feelings",
    description: "Honest lyrics, gentle company",
    track: "Blue Room",
    artist: "Eli Moon",
  },
  calm: {
    title: "A little room to breathe.",
    kicker: "SLOW & STEADY",
    message:
      "Quiet textures, soft voices, and unhurried rhythms to help the noise fall away.",
    mix: "Peaceful Moments",
    description: "Ease into something softer",
    track: "Still Water",
    artist: "Noa Lane",
  },
  energetic: {
    title: "Turn the feeling all the way up.",
    kicker: "HIGH VOLTAGE",
    message: "Big beats and magnetic hooks chosen to match your momentum.",
    mix: "Energy Unlocked",
    description: "Made to move with you",
    track: "Electric Rush",
    artist: "Nova Club",
  },
  angry: {
    title: "Give the feeling somewhere to go.",
    kicker: "LOUDER THAN WORDS",
    message:
      "Cathartic riffs, hard drums, and fearless vocals for releasing the pressure safely.",
    mix: "Let It Out",
    description: "Release, reset, return",
    track: "No Apologies",
    artist: "Static Bloom",
  },
  anxious: {
    title: "Stay here. Take one breath.",
    kicker: "GROUNDED SOUNDS",
    message:
      "Steady rhythms and comforting tones to meet you gently in this moment.",
    mix: "Take a Breather",
    description: "A softer place to land",
    track: "Anchor Me",
    artist: "Harbor Lights",
  },
  romantic: {
    title: "Some feelings deserve a slow dance.",
    kicker: "CLOSER, SOFTER",
    message:
      "Velvet vocals and intimate grooves, curated for your affectionate side.",
    mix: "Heart on Repeat",
    description: "Songs for leaning closer",
    track: "Afterglow",
    artist: "Sienna Vale",
  },
  nostalgic: {
    title: "Press play on a memory.",
    kicker: "THEN, NOW, ALWAYS",
    message:
      "Familiar melodies and timeless favourites that know exactly how to take you back.",
    mix: "Back in Time",
    description: "Yesterday sounds good on you",
    track: "Polaroid Summer",
    artist: "The Sundays",
  },
  motivated: {
    title: "This is your opening scene.",
    kicker: "FORWARD MOTION",
    message:
      "Confident rhythms and uplifting anthems for the next thing you're about to do.",
    mix: "Main Character Energy",
    description: "Focus on. Doubt off.",
    track: "Own the Morning",
    artist: "Ari Lennox",
  },
  numb: {
    title: "No pressure. Just music.",
    kicker: "MEET YOURSELF HERE",
    message:
      "You don't have to know what you're feeling. Take your time and let the music meet you where you are.",
    mix: "No Pressure, Just Music",
    description: "Gentle sounds, zero expectations",
    track: "Somewhere Soft",
    artist: "Grey June",
  },
}

const photos = {
  home: "https://cdn.pixabay.com/photo/2024/06/22/06/41/headphones-8845558_960_720.jpg",
  taste:
    "https://images.squarespace-cdn.com/content/v1/5edba4e2072bce37b5be7a28/346f5d5d-cb75-452a-92d1-16c1788d6359/neve_desk_nevosound_studio_london.jpg",
  discover:
    "https://static.vecteezy.com/system/resources/thumbnails/049/670/836/small_2x/silent-disco-party-with-neon-lights-photo.jpeg",
  about:
    "https://blog.on-page.ai/wp-content/uploads/2023/06/Advantages-of-AI-Powered-Transcription-1024x574.png",
}

const moodPhotos: Record<MoodId, string> = {
  happy:
    "https://static.vecteezy.com/system/resources/thumbnails/021/605/657/small_2x/happy-free-young-girl-in-long-dress-beauty-romantic-girl-outdoors-woman-photo.JPG",
  sad: "https://t3.ftcdn.net/jpg/09/31/61/52/360_F_931615229_scjFsQBYQygYIFW2ESc39WYciPrlItzO.jpg",
  calm: "https://media.istockphoto.com/id/528961622/photo/beautiful-sunset-meditation.jpg?s=612x612&w=0&k=20&c=Oc7D5JpZ3UswbgNc4yu2UZgtYWE3KwMwUZn8eicBB1o=",
  energetic:
    "https://img.magnific.com/premium-photo/energetic-happy-person-photos-lively-designs_1199394-205537.jpg",
  angry:
    "https://images.genius.com/0ce0254c5fa4fb56798d044917f6bba4.1000x1000x1.png",
  anxious:
    "https://welzo.com/cdn/shop/articles/7316261.jpg?v=1722428200",
  romantic:
    "https://images.unsplash.com/photo-1770335435091-75e3f07cd5e8?auto=format&fit=crop&w=1800&q=86",
  nostalgic:
    "https://images.unsplash.com/photo-1773430266140-ad5d57a83994?auto=format&fit=crop&w=1800&q=86",
  motivated:
    "https://images.unsplash.com/photo-1760112438116-078f0056ba71?auto=format&fit=crop&w=1800&q=86",
  numb: "https://media.gettyimages.com/id/1487978027/video/depressed-woman.jpg?s=640x640&k=20&c=x2xtM0BkkC1JYpWcI5VDWMLANHavqb2NEO7yvVsxMHM=",
}

const albumPhotos: Record<string, string> = {
  "R&B":
    "https://yt3.googleusercontent.com/3EEc_HUFW_SXVTLhAq05OX2jp-u91hoqk8aXnvMle1AF7mV7JLF5BcdISxpMWSH7DIm-n476kA=s900-c-k-c0x00ffffff-no-rj",

  "Amapiano":
    "https://i1.sndcdn.com/artworks-cJiVrvBzoJp6TVYQ-iN9FGg-t500x500.jpg",

  "Hip-hop":
    "https://i1.sndcdn.com/artworks-RF3xtEaJE959Wy7z-o4fcaQ-t500x500.jpg",

  "Pop":
    "https://yt3.ggpht.com/a/AATXAJx-n2UZJ3qMVpxUbhpaewMghJ7Tofe64A9sUA=s900-c-k-c0xffffffff-no-rj-mo",

  "Gospel":
    "https://wallpaperaccess.com/full/7902127.jpg",

  "Afro-soul":
    "https://geo-static.traxsource.com/files/labels/23256.jpg",

  "House":
    "https://is1-ssl.mzstatic.com/image/thumb/Music2/v4/c4/12/d4/c412d418-22b8-5db4-05ed-42cbea69cf19/889326482802_Cover.jpg/1200x1200bf-60.jpg",

  "Jazz":
    "https://images.squarespace-cdn.com/content/v1/5a455804d55b41f85db2c27b/1685568264148-R4WWBSN9U751Y00ZR3UY/image-asset.jpeg",

  "Rock":
    "https://img.magnific.com/premium-photo/concert-stage-rock-festival-music-instruments-background-with-copy-space-generated-by-ai_986584-4315.jpg?w=2000",

  "Classical":
    "https://i.ytimg.com/vi/Jhfrz7RiRe4/maxresdefault.jpg",

  "Lo-fi":
    "https://d2kbvjszk9d5ln.cloudfront.net/yshop/upload/pic/lofi-music-with-text-20220228071814906.jpg",

  "Electronic":
    "https://wallpapers.com/images/featured/electronic-dance-music-ggf56eubs12efkdd.jpg",
}

function Icon({
  name,
  size = 20,
  filled = false,
}: {
  name: IconName
  size?: number
  filled?: boolean
}) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M19 12H5m6-6-6 6 6 6" />,
    arrowUp: <path d="M7 17 17 7M8 7h9v9" />,
    check: <path d="m5 12 4 4L19 7" />,
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5a5.5 5.5 0 0 0 1-8.9Z" />
    ),
    pause: (
      <>
        <path d="M8 5v14" />
        <path d="M16 5v14" />
      </>
    ),
    play: <path d="m8 5 11 7-11 7V5Z" />,
    previous: <path d="M6 5v14m13-13-9 6 9 6V6Z" />,
    next: <path d="M18 5v14M5 6l9 6-9 6V6Z" />,
    shuffle: <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />,
    repeat: (
      <path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3" />
    ),
    queue: <path d="M4 6h11M4 12h11M4 18h7m7-3v6m-3-3h6" />,
    sparkle: (
      <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" />
    ),
  }
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function Wordmark() {
  return (
    <div className="wordmark">
      <span className="wordmark__mark" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span>LumiListen</span>
    </div>
  )
}

function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  compact = false,
}: {
  children: React.ReactNode
  onClick: () => void
  variant?: "primary" | "secondary" | "ghost"
  disabled?: boolean
  compact?: boolean
}) {
  return (
    <button
      className={`button button--${variant} ${
        compact ? "button--compact" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

function Header({
  onNavigate,
  onBack,
  light = false,
}: {
  onNavigate: (screen: Screen) => void
  onBack?: () => void
  light?: boolean
}) {
  return (
    <header className={`site-header ${light ? "site-header--light" : ""}`}>
      <div className="site-header__inner">
        <button
          className="brand-button"
          onClick={() => onNavigate("home")}
          aria-label="LumiListen home"
        >
          <Wordmark />
        </button>
        <nav className="site-nav" aria-label="Primary navigation">
          <button onClick={() => onNavigate("discover")}>Discover</button>
          <button onClick={() => onNavigate("how")}>How It Works</button>
          <button onClick={() => onNavigate("about")}>About</button>
        </nav>
        {onBack ? (
          <button className="back-button" onClick={onBack}>
            <Icon name="arrow" size={18} /> Back
          </button>
        ) : (
          <span className="header-status">
            <i /> MUSIC FOR THIS MOMENT
          </span>
        )}
      </div>
    </header>
  )
}

function Footer({ onHandoff }: { onHandoff: () => void }) {
  return (
    <footer className="site-footer">
      <Wordmark />
      <p>Feel it. Find it. Play it.</p>
      <button onClick={onHandoff}>
        Developer Handoff <Icon name="arrowUp" size={15} />
      </button>
    </footer>
  )
}

function PlaylistCard({
  image,
  title,
  description,
  meta,
  onClick,
}: {
  image: string
  title: string
  description: string
  meta: string
  onClick: () => void
}) {
  return (
    <button className="playlist-card" onClick={onClick}>
      <span className="playlist-card__image">
        <img src={image} alt="" />
        <span className="playlist-card__play">
          <Icon name="play" filled size={20} />
        </span>
      </span>
      <span className="playlist-card__meta">{meta}</span>
      <strong>{title}</strong>
      <small>{description}</small>
    </button>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home")
  const [handoffBack, setHandoffBack] = useState<Screen>("home")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [surprise, setSurprise] = useState(false)
  const [selectedMood, setSelectedMood] = useState<MoodId | null>(null)
  const [genreError, setGenreError] = useState(false)
  const [moodError, setMoodError] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [favourite, setFavourite] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)

  const mood = moods.find((item) => item.id === selectedMood) ?? moods[0]
  const rec = recommendations[mood.id]
  const moodIndex = moods.findIndex((item) => item.id === mood.id)
  const genreSummary = surprise
    ? "A little of everything"
    : selectedGenres.length
      ? selectedGenres.slice(0, 3).join(" · ")
      : "Curated for you"
  const tracks = useMemo(
    () => [
      { title: rec.track, artist: rec.artist, time: "3:42" },
      {
        title: `${mood.name} in Motion`,
        artist: "LumiListen Selects",
        time: "4:08",
      },
      { title: "Stay Awhile", artist: "Maya Sol", time: "3:21" },
      { title: "A Light Through", artist: "Noa Lane", time: "3:56" },
    ],
    [mood.name, rec.artist, rec.track],
  )

  const navigate = (next: Screen) => {
    setScreen(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const openHandoff = () => {
    setHandoffBack(screen)
    navigate("handoff")
  }

  const toggleGenre = (genre: string) => {
    setSurprise(false)
    setGenreError(false)
    setSelectedGenres((current) =>
      current.includes(genre)
        ? current.filter((item) => item !== genre)
        : [...current, genre],
    )
  }

  const continueTaste = () => {
    if (!selectedGenres.length && !surprise) {
      setGenreError(true)
      return
    }
    navigate("mood")
  }

  const continueMood = () => {
    if (!selectedMood) {
      setMoodError(true)
      return
    }
    navigate("recommendation")
  }

  const chooseMood = (id: MoodId) => {
    setSelectedMood(id)
    setMoodError(false)
  }

  const changeTrack = (direction: number) => {
    setTrackIndex(
      (current) => (current + direction + tracks.length) % tracks.length,
    )
    setPlaying(true)
  }

  const startPlaylist = (index = 0) => {
    setTrackIndex(index % tracks.length)
    setPlaying(true)
    navigate("player")
  }

  return (
    <main className={`website accent-${mood.id}`}>
      {screen === "home" && (
        <div className="home-page screen-enter">
          <img
            className="full-bg"
            src={photos.home}
            alt="Person immersed in music under cinematic lights"
          />
          <div className="full-bg-overlay" />
          <Header onNavigate={navigate} light />
          <div className="home-hero container">
            <div className="home-hero__copy">
              <span className="eyebrow">MUSIC THAT MEETS YOU THERE</span>
              <div className="display display--hero">
                Feel it. <em>Find it.</em>
                <br />
                Play it.
              </div>
              <p>
                Whatever you're feeling, there's a sound for that. Discover
                music that moves with your mood.
              </p>
              <Button onClick={() => navigate("taste")} compact>
                Let's Activate That Mood <Icon name="arrowUp" size={18} />
              </Button>
              <small>Your mood. Your music. Your moment.</small>
            </div>
            <div className="home-hero__signal">
              <span>LIVE FREQUENCY</span>
              <div>
                {[22, 35, 54, 78, 42, 68, 31, 60, 25, 47, 20, 38].map(
                  (height, index) => (
                    <i key={index} style={{ height }} />
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="home-bottom container">
            <span>01 — CHECK IN</span>
            <span>02 — CHOOSE A FEELING</span>
            <span>03 — FIND YOUR SOUND</span>
          </div>
        </div>
      )}

      {screen === "taste" && (
        <div className="editorial-page screen-enter">
          <div className="page-banner page-banner--taste">
            <img src={photos.taste} alt="A cinematic record collection" />
            <div className="page-banner__overlay" />
            <Header
              onNavigate={navigate}
              onBack={() => navigate("home")}
              light
            />
            <div className="page-title container">
              <span className="eyebrow">01 / SHAPE YOUR SOUND</span>
              <div className="display display--page">Your music. Your way.</div>
              <p>Choose the sounds you love. We'll help you discover more.</p>
            </div>
          </div>
          <section className="content-section container">
            <div className="section-topline">
              <div>
                <strong>Choose your favourites</strong>
                <span>Select as many as you like</span>
              </div>
              <span>
                {selectedGenres.length
                  ? `${selectedGenres.length} genres selected`
                  : "No genres selected"}
              </span>
            </div>
            <div className="genre-grid">
              {genres.map((genre, index) => {
                const selected = selectedGenres.includes(genre)
                return (
                  <button
                    key={genre}
                    className={`genre-card ${selected ? "is-selected" : ""}`}
                    onClick={() => toggleGenre(genre)}
                    aria-pressed={selected}
                  >
                    <img
  src={albumPhotos[genre]}
  alt={`${genre} music atmosphere`}
/>
                    <span className="card-scrim" />
                    <span className="genre-card__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong>{genre}</strong>
                    <span className="selection-check">
                      <Icon name="check" size={15} />
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="selection-footer">
              <button
                className={`surprise-card ${surprise ? "is-selected" : ""}`}
                onClick={() => {
                  setSurprise((value) => !value)
                  setSelectedGenres([])
                  setGenreError(false)
                }}
              >
                <span>
                  <Icon name="sparkle" />
                </span>
                <span>
                  <strong>Surprise Me</strong>
                  <small>
                    Skip the labels. We'll build something unexpected.
                  </small>
                </span>
                <span className="selection-check">
                  <Icon name="check" size={15} />
                </span>
              </button>
              <div>
                {genreError && (
                  <p className="validation">
                    Choose a genre or select Surprise Me to continue.
                  </p>
                )}
                <Button onClick={continueTaste} compact>
                  Continue to moods <span>→</span>
                </Button>
              </div>
            </div>
          </section>
          <Footer onHandoff={openHandoff} />
        </div>
      )}

      {screen === "mood" && (
        <div className="editorial-page screen-enter">
          <div className="mood-heading">
            <Header onNavigate={navigate} onBack={() => navigate("taste")} />
            <div className="page-title page-title--center container">
              <span className="eyebrow">02 / CHECK IN WITH YOURSELF</span>
              <div className="display display--page">
                How are you feeling today?
              </div>
              <p>
                There's no right or wrong feeling. Find the sound that meets you
                where you are.
              </p>
            </div>
          </div>
          <section className="content-section content-section--moods container">
            <div className="mood-grid">
              {moods.map((item, index) => {
                const selected = selectedMood === item.id
                return (
                  <button
                    key={item.id}
                    className={`mood-card ${selected ? "is-selected" : ""}`}
                    onClick={() => chooseMood(item.id)}
                    aria-pressed={selected}
                  >
                    <img src={moodPhotos[item.id]} alt="" />
                    <span className="mood-card__overlay" />
                    <span className="mood-card__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mood-card__emoji">{item.emoji}</span>
                    <span className="mood-card__copy">
                      <strong>{item.name}</strong>
                      <small>{item.description}</small>
                    </span>
                    <span className="selection-check">
                      <Icon name="check" size={15} />
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="mood-action">
              <div>
                {selectedMood === "numb" && (
                  <p className="support-note">
                    That's okay. You don't have to figure it all out right now.
                  </p>
                )}
                {moodError && (
                  <p className="validation">
                    Take your time—choose the feeling that comes closest.
                  </p>
                )}
              </div>
              <Button onClick={continueMood} compact>
                Find My Sound <span>→</span>
              </Button>
            </div>
          </section>
          <Footer onHandoff={openHandoff} />
        </div>
      )}

      {screen === "recommendation" && (
        <div className="recommendation-page screen-enter">
          <section className="recommendation-hero">
            <img
              src={moodPhotos[mood.id]}
              alt={`Atmospheric scene for ${mood.name}`}
            />
            <div className="recommendation-hero__overlay" />
            <Header
              onNavigate={navigate}
              onBack={() => navigate("mood")}
              light
            />
            <div className="recommendation-hero__content container">
              <div>
                <span className="eyebrow">{rec.kicker}</span>
                <div className="display display--recommendation">
                  {rec.title}
                </div>
                <p>{rec.message}</p>
                <div className="recommendation-hero__actions">
                  <Button onClick={() => startPlaylist(0)} compact>
                    <Icon name="play" filled size={17} /> Play My Mix
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => navigate("mood")}
                    compact
                  >
                    Explore Other Moods
                  </Button>
                </div>
              </div>
              <div className="mood-stamp">
                <span>{mood.emoji}</span>
                <small>CURRENT MOOD</small>
                <strong>{mood.name}</strong>
              </div>
            </div>
          </section>
          <section className="playlist-section container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">PERSONALISED FOR YOU</span>
                <div className="display display--section">{rec.mix}</div>
              </div>
              <p>
                Built around <strong>{genreSummary}</strong> and how you're
                feeling right now.
              </p>
            </div>
            <div className="playlist-grid playlist-grid--four">
              {[0, 1, 2, 3].map((index) => (
                <PlaylistCard
                  key={index}
                  image={albumPhotos[genres[(moodIndex + index) % genres.length]]}
                  title={
                    index === 0 ? rec.mix : tracks[index % tracks.length].title
                  }
                  description={
                    index === 0
                      ? rec.description
                      : tracks[index % tracks.length].artist
                  }
                  meta={
                    index === 0
                      ? "LUMILISTEN ORIGINAL"
                      : `${12 + index * 3} TRACKS`
                  }
                  onClick={() => startPlaylist(index)}
                />
              ))}
            </div>
          </section>
          <Footer onHandoff={openHandoff} />
        </div>
      )}

      {screen === "player" && (
        <div className="player-page screen-enter">
          <img className="player-bg" src={moodPhotos[mood.id]} alt="" />
          <div className="player-bg-overlay" />
          <Header
            onNavigate={navigate}
            onBack={() => navigate("recommendation")}
            light
          />
          <div className="desktop-player container">
            <section className={`album-stage ${playing ? "is-playing" : ""}`}>
              <div className="album-stage__halo" />
              <img
                src={albumPhotos[genres[(moodIndex + trackIndex) % genres.length]]}
                alt={`${tracks[trackIndex].title} cover`}
              />
              <span>CURATED FOR YOUR {mood.name.toUpperCase()} MOOD</span>
            </section>
            <section className="now-playing">
              <span className="eyebrow">
                NOW PLAYING · {genreSummary.toUpperCase()}
              </span>
              <div className="display display--track">
                {tracks[trackIndex].title}
              </div>
              <p>{tracks[trackIndex].artist}</p>
              <button
                className={`heart-button ${favourite ? "is-active" : ""}`}
                onClick={() => setFavourite((value) => !value)}
                aria-label={
                  favourite ? "Remove from favourites" : "Add to favourites"
                }
              >
                <Icon name="heart" filled={favourite} size={22} />{" "}
                {favourite ? "Saved to favourites" : "Save track"}
              </button>
              <div className="progress">
                <button
                  className="progress__track"
                  onClick={() => setPlaying(true)}
                  aria-label="Seek playback"
                >
                  <i style={{ width: playing ? "46%" : "30%" }} />
                  <b style={{ left: playing ? "46%" : "30%" }} />
                </button>
                <div>
                  <span>{playing ? "1:43" : "1:12"}</span>
                  <span>{tracks[trackIndex].time}</span>
                </div>
              </div>
              <div className="player-controls">
                <button
                  className={shuffle ? "is-active" : ""}
                  onClick={() => setShuffle((value) => !value)}
                  aria-label="Toggle shuffle"
                >
                  <Icon name="shuffle" />
                </button>
                <button
                  onClick={() => changeTrack(-1)}
                  aria-label="Previous track"
                >
                  <Icon name="previous" filled size={26} />
                </button>
                <button
                  className="main-play"
                  onClick={() => setPlaying((value) => !value)}
                  aria-label={playing ? "Pause" : "Play"}
                >
                  <Icon name={playing ? "pause" : "play"} filled size={29} />
                </button>
                <button onClick={() => changeTrack(1)} aria-label="Next track">
                  <Icon name="next" filled size={26} />
                </button>
                <button
                  className={repeat ? "is-active" : ""}
                  onClick={() => setRepeat((value) => !value)}
                  aria-label="Toggle repeat"
                >
                  <Icon name="repeat" />
                </button>
              </div>
              <span className="simulation-label">
                SIMULATED PLAYBACK · {playing ? "PLAYING" : "PAUSED"}
              </span>
            </section>
            <aside className="queue-panel">
              <div className="queue-panel__heading">
                <span>
                  <Icon name="queue" size={18} /> UP NEXT
                </span>
                <small>{tracks.length} TRACKS</small>
              </div>
              {tracks.map((track, index) => (
                <button
                  key={track.title}
                  className={trackIndex === index ? "is-current" : ""}
                  onClick={() => {
                    setTrackIndex(index)
                    setPlaying(true)
                  }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{track.title}</strong>
                    <small>{track.artist}</small>
                  </span>
                  <span>{trackIndex === index ? "PLAYING" : track.time}</span>
                </button>
              ))}
            </aside>
          </div>
        </div>
      )}

      {screen === "discover" && (
        <div className="editorial-page discover-page screen-enter">
          <div className="discover-hero">
            <img src={photos.discover} alt="Neon city lights at night" />
            <div className="page-banner__overlay" />
            <Header
              onNavigate={navigate}
              onBack={() => navigate("home")}
              light
            />
            <div className="page-title container">
              <span className="eyebrow">FRESH FINDS, EVERY FEELING</span>
              <div className="display display--page">
                Find your next favourite sound.
              </div>
              <p>
                New releases, rising moods, and playlists the LumiListen
                community can't stop playing.
              </p>
            </div>
          </div>
          <section className="playlist-section container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">TRENDING NOW</span>
                <div className="display display--section">
                  On repeat this week
                </div>
              </div>
              <p>Curated across moods and genres.</p>
            </div>
            <div className="playlist-grid playlist-grid--five">
              {[
                "Midnight Motion",
                "Soft Focus",
                "Golden State",
                "After Hours",
                "Sunday Soul",
              ].map((title, index) => (
                <PlaylistCard
                  key={title}
                  image={albumPhotos[index]}
                  title={title}
                  description={
                    [
                      "Nova Club",
                      "Maya Sol",
                      "Mila Rae",
                      "Sienna Vale",
                      "Eli Moon",
                    ][index]
                  }
                  meta={`${20 + index * 3} TRACKS`}
                  onClick={() => {
                    setSelectedMood(moods[index * 2].id)
                    startPlaylist(index)
                  }}
                />
              ))}
            </div>
            <div className="discover-columns">
              <div>
                <span className="eyebrow">POPULAR GENRES</span>
                <div className="chip-cloud">
                  {[
                    "R&B",
                    "Amapiano",
                    "Afro-soul",
                    "Lo-fi",
                    "House",
                    "Jazz",
                  ].map((genre) => (
                    <button
                      key={genre}
                      onClick={() => {
                        setSelectedGenres([genre])
                        navigate("mood")
                      }}
                    >
                      {genre} <span>↗</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="eyebrow">FEATURED MOODS</span>
                <div className="featured-moods">
                  {moods.slice(0, 4).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        chooseMood(item.id)
                        navigate("recommendation")
                      }}
                    >
                      <span>{item.emoji}</span>
                      <strong>{item.name}</strong>
                      <small>{recommendations[item.id].mix}</small>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => navigate("mood")}
              compact
            >
              Explore another mood <span>→</span>
            </Button>
          </section>
          <Footer onHandoff={openHandoff} />
        </div>
      )}

      {(screen === "about" || screen === "how") && (
        <div className="story-page screen-enter">
          <img
            className="full-bg"
            src={photos.about}
            alt="People moving through trails of light"
          />
          <div className="story-overlay" />
          <Header onNavigate={navigate} onBack={() => navigate("home")} light />
          <div className="story-content container">
            <section>
              <span className="eyebrow">
                {screen === "about" ? "ABOUT LUMILISTEN" : "HOW IT WORKS"}
              </span>
              <div className="display display--story">
                {screen === "about"
                  ? "Music for the way life actually feels."
                  : "Three steps. One soundtrack that feels like you."}
              </div>
              <p>
                LumiListen connects the music you love with the feelings you're
                experiencing. Choose your favourite genres, select your mood,
                and explore playlists that meet you where you are.
              </p>
              <Button onClick={() => navigate("taste")} compact>
                Activate a mood <span>→</span>
              </Button>
            </section>
            <section className="steps">
              {[
                [
                  "01",
                  "Choose your music taste",
                  "Tell us the sounds and genres that already feel like home.",
                ],
                [
                  "02",
                  "Check in with yourself",
                  "Name the feeling—or choose Numb or Unsure if words don't fit.",
                ],
                [
                  "03",
                  "Discover your soundtrack",
                  "Explore personalised mixes shaped by mood and music taste.",
                ],
              ].map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </section>
          </div>
          <Footer onHandoff={openHandoff} />
        </div>
      )}

      {screen === "handoff" && (
        <div className="handoff-page screen-enter">
          <Header onNavigate={navigate} onBack={() => navigate(handoffBack)} />
          <div className="handoff-intro container">
            <span className="eyebrow">DEVELOPER HANDOFF / LUMILISTEN WEB</span>
            <div className="display display--page">
              System notes for a responsive build.
            </div>
            <p>
              Interaction, layout, visual, and implementation guidance for
              translating the prototype into production.
            </p>
          </div>
          <div className="handoff-grid container">
            {[
              [
                "01 / CANVAS",
                "1440 × 1000 reference",
                "Full-width browser canvas. 1240px maximum content width with fluid 32–72px gutters. Breakpoints at 1024px and 700px.",
              ],
              [
                "02 / COLOUR",
                "Midnight, Plum, Lavender",
                "#0B0B0F background · #21172F panels · #D7B8FF interactions · #FFFFFF primary text. Never use accent colour alone for state.",
              ],
              [
                "03 / TYPOGRAPHY",
                "Poppins + Open Sans",
                "Poppins 600–700 for editorial headings. Open Sans 400–700 for body, navigation, controls, metadata, and labels.",
              ],
              [
                "04 / COMPONENTS",
                "Reusable and stateful",
                "Header, Button, Genre Card, Mood Card, Playlist Card, Back Button, Player Control. Default, hover, selected, disabled, active, and error states.",
              ],
              [
                "05 / SELECTION",
                "Clear conditional rules",
                "Genres are multi-select. Mood is single-select. A checkmark accompanies selected colour. Surprise Me bypasses genre selection.",
              ],
              [
                "06 / MOOD MAPPING",
                "10 distinct states",
                "Each mood maps to its own hero photograph, recommendation title, message, playlist naming, lead track, and accent atmosphere.",
              ],
              [
                "07 / VALIDATION",
                "Friendly, never punitive",
                "Continue without a selection reveals contextual inline guidance. Numb or Unsure always remains a valid, respected choice.",
              ],
              [
                "08 / MOTION",
                "300ms Ease Out",
                "Use Smart Animate equivalents for page changes, 180ms for card states, gentle image fades, and reduced-motion fallbacks.",
              ],
              [
                "09 / PLAYER",
                "Simulated prototype states",
                "Play/pause, previous/next, favourite, shuffle, repeat, seek, and queue selection all expose visible state changes.",
              ],
              [
                "10 / ACCESSIBILITY",
                "Readable and operable",
                "AA contrast, semantic labels, visible focus, 44px targets, keyboard navigation, alt text, and no colour-only communication.",
              ],
            ].map(([label, title, text]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
            <article className="handoff-grid__wide">
              <span>PRODUCTION INTEGRATIONS</span>
              <strong>Prototype behavior is not a streaming service.</strong>
              <p>
                Real audio playback, licensing, streaming, authentication, saved
                preferences, persistence, analytics, and device notification
                permissions require production implementation and appropriate
                third-party integrations.
              </p>
            </article>
          </div>
          <Footer onHandoff={() => navigate(handoffBack)} />
        </div>
      )}
    </main>
  )
}
