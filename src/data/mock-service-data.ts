import { InfoCard } from "@/types/Simple";

export const MOCK_SERVICE_DATA: InfoCard[] = [
    {
        id: "1",
        title: "Layanan Kependudukan",
        description: "Layanan administrasi kependudukan seperti KTP, KK, dan Akta.",
        icon: "users",
        link: "/layanan/kependudukan",
        order: 1,
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000",
    },
    {
        id: "2",
        title: "Layanan Kesehatan",
        description: "Informasi mengenai puskesmas, posyandu, dan layanan kesehatan lainnya.",
        icon: "activity",
        link: "/layanan/kesehatan",
        order: 2,
        child: [
            {
                id: "2-1",
                title: "Puskesmas",
                description: "Jadwal dan layanan Puskesmas Desa.",
                icon: "FaQuestion",
                link: "/layanan/kesehatan/puskesmas",
                order: 1,
                image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000",
            },
            {
                id: "2-2",
                title: "Posyandu",
                description: "Jadwal kegiatan Posyandu Balita dan Lansia.",
                icon: "users",
                link: "/layanan/kesehatan/posyandu",
                order: 2,
            }
        ]
    },
    {
        id: "3",
        title: "Layanan Perizinan",
        description: "Pengurusan izin usaha dan surat keterangan lainnya.",
        icon: "file-text",
        link: "/layanan/perizinan",
        order: 3,
        // No image, no child - should fallback to default icon view
    }
];
