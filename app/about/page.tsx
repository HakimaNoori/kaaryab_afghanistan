"use client";

import { Target, Users, Lightbulb, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
    const { t, language } = useLanguage();

    const content = {
        en: {
            missionTitle: "Our Mission",
            missionText:
                "Many young people in Afghanistan struggle to find reliable information about jobs, internships, scholarships, remote work, and training programs. Information is scattered across different websites, social media pages, and groups. KaarYab Afghanistan solves this problem by bringing all these opportunities together in one clean and easy-to-use platform.",
            whoTitle: "Who Is It For?",
            whoList: [
                "Students",
                "Fresh graduates",
                "Job seekers",
                "Women looking for remote work",
                "People searching for scholarships",
                "People looking for internships",
                "Organizations sharing opportunities",
            ],
            whatTitle: "What You Can Do",
            whatList: [
                "Browse and search opportunities by category, location, and type",
                "View full details of each opportunity",
                "Save opportunities for later",
                "Submit new opportunities",
                "Track statistics on the dashboard",
            ],
            noteTitle: "Important Note",
            noteText:
                "This is a demo project built for educational purposes as a final capstone project. The opportunities shown are sample data and may not represent real current openings. Always verify information before applying.",
        },
        fa: {
            missionTitle: "ماموریت ما",
            missionText:
                "بسیاری از جوانان در افغانستان برای پیدا کردن اطلاعات قابل اعتماد درباره شغل، کارآموزی، بورسیه، کار ریموت و برنامه‌های آموزشی مشکل دارند. اطلاعات در وب‌سایت‌ها و صفحات مختلف پراکنده است. کاریاب افغانستان این مشکل را با جمع‌آوری همه فرصت‌ها در یک پلتفرم تمیز و آسان حل می‌کند.",
            whoTitle: "برای چه کسانی است؟",
            whoList: [
                "دانشجویان",
                "فارغ‌التحصیلان جدید",
                "جویندگان کار",
                "زنانی که به دنبال کار ریموت هستند",
                "افرادی که به دنبال بورسیه هستند",
                "افرادی که به دنبال کارآموزی هستند",
                "سازمان‌هایی که فرصت‌ها را به اشتراک می‌گذارند",
            ],
            whatTitle: "چه کارهایی می‌توانید انجام دهید",
            whatList: [
                "مرور و جستجوی فرصت‌ها بر اساس دسته، مکان و نوع",
                "مشاهده جزئیات کامل هر فرصت",
                "ذخیره فرصت‌ها برای بعد",
                "ثبت فرصت‌های جدید",
                "پیگیری آمار در داشبورد",
            ],
            noteTitle: "نکته مهم",
            noteText:
                "این یک پروژه نمایشی برای اهداف آموزشی است. فرصت‌های نمایش‌داده‌شده داده‌های نمونه هستند و ممکن است فرصت‌های واقعی فعلی نباشند. همیشه قبل از درخواست، اطلاعات را بررسی کنید.",
        },
        ps: {
            missionTitle: "زموږ ماموریت",
            missionText:
                "ډیری ځوانان په افغانستان کې د دندو، انټرنشپونو، سکالرشیپونو، ریموټ کار او روزنیزو پروګرامونو په اړه د باوري معلوماتو موندلو کې ستونزه لري. معلومات په مختلفو ویب پاڼو او ټولنیزو رسنیو کې خپاره دي. کارياب افغانستان دا ستونزه حلوي.",
            whoTitle: "د چا لپاره دی؟",
            whoList: [
                "زده کونکي",
                "نوي فارغ التحصیلان",
                "د دندې لټونکي",
                "ښځې چې ریموټ کار لټوي",
                "هغه کسان چې سکالرشیپ لټوي",
                "هغه کسان چې انټرنشپ لټوي",
                "سازمانونه چې فرصتونه شریکوي",
            ],
            whatTitle: "تاسو څه کولی شئ",
            whatList: [
                "د کټګورۍ، ځای او ډول له مخې فرصتونه وپلټئ",
                "د هر فرصت بشپړ تفصیلات وګورئ",
                "فرصتونه خوندي کړئ",
                "نوي فرصتونه ثبت کړئ",
                "په ډشبورډ کې احصایې تعقیب کړئ",
            ],
            noteTitle: "مهمه یادونه",
            noteText:
                "دا د زده کړې لپاره یوه ډیمو پروژه ده. ښودل شوي فرصتونه نمونه‌يي معلومات دي. تل د غوښتنې دمخه معلومات تایید کړئ.",
        },
    };

    const c = content[language];

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.about.title}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {t.about.subtitle}
                </p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                        <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-xl font-semibold">{c.missionTitle}</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{c.missionText}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-xl font-semibold">{c.whoTitle}</h2>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
                    {c.whoList.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                            • {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-xl font-semibold">{c.whatTitle}</h2>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    {c.whatList.map((item) => (
                        <li key={item}>• {item}</li>
                    ))}
                </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <h2 className="font-semibold text-amber-800 dark:text-amber-300">{c.noteTitle}</h2>
                </div>
                <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">{c.noteText}</p>
            </div>
        </div>
    );
}