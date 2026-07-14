

// Site Information Types
export interface SiteInfo {
  name: string
  tagline: string
  phone: string
  email: string
  address: string
  logo: string
}

// Navigation Types
export interface NavItem {
  order: number
  title: string
  route: string
  staticPage: string | null
  child: NavItem[]
  icon?: string
  isActive?: boolean
  children?: NavItem[]
}

export interface NavLayanan {
  id: number,
  order: number,
  title: string,
  icon: string,
  link: string,
  isDefault: boolean
}

//aparatur Types
export interface AparaturInterface {
  nama: string
  jabatan: string
  foto?: string
}

// Social Media Types
export interface SocialLink {
  platform: "facebook" | "twitter" | "instagram" | "youtube" | "linkedin"
  url: string
}

// Info Card Types
export interface InfoCard {
  id: string
  title: string
  description: string
  icon: string
  link: string | { text: string; url: string }
  order: number
  image?: string;
  child?: InfoCard[];
}

// News Item Types
export interface NewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  image: string
  slug: string
}

// Gallery Item Types
export interface GalleryItem {
  id: string
  image: string
  title: string
}

// Service Types
export interface Service {
  id: string
  title: string
  url: string
}

// Hero Section Types
export interface HeroSection {
  title: string
  description: string
  image: string
  buttons: {
    primary: {
      text: string
      url: string
    }
    secondary: {
      text: string
      url: string
    }
  }
}

// About Section Types
export interface AboutSection {
  subTittle: string
  title: string
  description: string[]
  image: string
  button: {
    text: string
    url: string
  }
}

// CTA Section Types
export interface CTASection {
  title: string
  description: string
  buttons: {
    primary: {
      text: string
      url: string
      icon: string
    }
    secondary: {
      text: string
      url: string
      icon: string
    }
  }
}

// Profil Section Types
export interface ProfilInterface {
  title: string
  date: string
  author: string
  readTime: string
  content: string
}

// Pemerintah Desa Section Types
export interface PemerintahInterface {
  title: string
  date: string
  author: string
  readTime: string
  content: string
}

// Budget Section Types
export interface BudgetInterface {
  title: string,
  current: string,
  target: string,
  percentage: number,
}

export interface DataPendudukInterface {
  id: number,
  wilayah: string,
  kk: number,
  lp: number,
  l: number,
  p: number
}

export interface KategoriKeluargaInterface {
  id: number,
  kategori: string,
  jumlah: number,
}

export interface DataStatisticInterface {
  id: number,
  kategori: string,
  lp: number,
  l: number,
  p: number
}

export interface ProdukHukumInterface {
  id: number,
  title: string,
  file: string
}

export interface ProductItem {
  id: number;
  name: string;
  seller: string;
  price: number;
  image: string;
}

export interface MetaDataPDF {
  type: string;
  title: string;
  TEU: string;
  number: string;
  form: string;
  shortForm: string;
  year: number;
  location: string;
  approvalDate: string;
  enactmentDate: string;
  effectiveDate: string;
  source: string;
  subject: string;
  status: string;
  language: string;
  region: string;
  field: string;
  translation: string;
}