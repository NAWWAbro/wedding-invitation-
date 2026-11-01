// =========================================================================
// WEDDING INVITATION CONFIGURATION
// Details extracted from Kavishka & Samindya's Wedding Card
// High-fidelity clone matching the original site's audio, video & styling
// =========================================================================

export const weddingConfig = {
  // Couple Information
  couple: {
    groom: {
      firstName: "Kavishka",
      fullName: "Kavishka",
      title: "The Groom",
      parents: "Together with their beloved parents",
      bio: "Excited and blessed to step into forever with the love of my life.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
    },
    bride: {
      firstName: "Samindya",
      fullName: "Samindya",
      title: "The Bride",
      parents: "Together with their beloved parents",
      bio: "With a heart full of love and gratitude, ready to begin our beautiful journey together.",
      image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80"
    },
    monogram: "K & S",
    hashtag: "#KavishkaWedsSamindya2027"
  },

  // Key Dates and Countdown
  event: {
    // Wednesday, January 20, 2027 at 8:00 AM (Sri Lanka Time UTC+05:30)
    targetDateTime: "2027-01-20T08:00:00+05:30",
    dateDisplayNumeric: "20 . 01 . 2027",
    dateDisplayLong: "Wednesday, 20 January 2027",
    ceremonyTime: "At eight o'clock in the morning (8:00 AM)",
    poruwaTime: "08:00 AM",
    receptionTime: "Reception to follow",
    welcomeTitle: "With hearts full of love, together with their parents",
    subInvitationText: "request the honour of the presence of your company to join them in celebrating the joy of their marriage."
  },

  // Venue Information
  venue: {
    name: "Saru Blue Sapphire Hotel",
    hall: "Grand Banquet Hall",
    city: "Godakawela, Sri Lanka",
    address: "Kosnathora, Godakawela",
    mapQuery: "Saru Blue Sapphire Hotel Godakawela",
    googleMapsUrl: "https://maps.google.com/?q=Saru+Blue+Sapphire+Hotel+Godakawela",
    embedMapUrl: "https://maps.google.com/maps?q=Saru%20Blue%20Sapphire%20Hotel%20Godakawela&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },

  // Timeline of the Day
  timeline: [
    {
      time: "08:00 AM",
      title: "Guest Arrival & Welcome",
      description: "Warm welcome with traditional refreshments and herbal tea as guests arrive.",
      icon: "🥂"
    },
    {
      time: "08:30 AM",
      title: "Auspicious Poruwa Ceremony",
      description: "Sacred customs, exchange of vows and rings, blessed by Jayamangala Gatha.",
      icon: "💍"
    },
    {
      time: "09:30 AM",
      title: "Lighting of the Oil Lamp",
      description: "Illuminating prosperity and harmony for a lifetime together.",
      icon: "✨"
    },
    {
      time: "10:15 AM",
      title: "Cake Cutting & Champagne Toast",
      description: "Heartfelt speeches, champagne toast, and sweet celebrations.",
      icon: "🎂"
    },
    {
      time: "11:30 AM",
      title: "Wedding Reception & Buffet Feast",
      description: "A lavish celebration feast with exquisite culinary delights.",
      icon: "🍽️"
    },
    {
      time: "01:30 PM",
      title: "Music, Photographs & Dancing",
      description: "Cherished photographs and lively music on the dance floor.",
      icon: "🎵"
    },
    {
      time: "03:30 PM",
      title: "Farewell & Sending-off",
      description: "Shower of good wishes and heartfelt hugs as the couple departs.",
      icon: "🚗"
    }
  ],

  // Gallery Photos
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
      caption: "A Promise of Forever"
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
      caption: "Under the Golden Hour"
    },
    {
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80",
      caption: "Two Hearts, One Soul"
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
      caption: "Laughter & Pure Joy"
    },
    {
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80",
      caption: "Hand in Hand"
    },
    {
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80",
      caption: "The Beginning of Always"
    }
  ],

  // Background Audio from original site: Ed Sheeran - Perfect (Karaoke)
  audio: {
    trackUrl: "./Ed Sheeran - Perfect (Karaoke).mp3",
    title: "Ed Sheeran - Perfect (Acoustic Karaoke)"
  },

  // Video Intro Asset
  video: {
    src: "./intro_video.mp4"
  },

  // Dress Code Guidance
  dressCode: {
    palette: ["#477654", "#72a981", "#a6cba4", "#d5e5d1", "#ffffff"],
    title: "Formal / Traditional Elegance",
    description: "Botanical greens, sage, soft ivory, champagne, or elegant traditional Sri Lankan attire."
  },

  // RSVP Contact Information
  rsvp: {
    deadline: "December 31, 2026",
    contactNumbers: [
      { name: "Kavishka (Groom)", phone: "+94 77 000 0000" },
      { name: "Samindya (Bride)", phone: "+94 71 000 0000" }
    ],
    whatsappNumber: "94770000000"
  }
};
