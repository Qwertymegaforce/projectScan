export const tariffs = [
    {
        header: "Beginner",
        headerTextColor: "black",
        apiName: "beginner",
        image: "../../../static/svg/svg_homepage/tariffs/bulb.svg",
        headerColor: "rgb(255, 182, 79)",
        forWhom: "Для небольшого исследования",
        price: "1200",
        sale: "799",
        splitPrice: "или 150 ₽/мес. при рассрочке на 24 мес.",
        offers: [
            'Безлимитная история запросов',
            'Безопасная сделка',
            'Поддержка 24/7'
        ]
    },
    {
        header: "Pro",
        apiName: "pro",
        headerTextColor: "black",
        image: "../../../static/svg/svg_homepage/tariffs/arrow_target.svg",
        headerColor: "rgb(124, 227, 225)",
        forWhom: "Для HR и фрилансеров",
        price: "2 600",
        sale: "1 299",
        splitPrice: "или 279 ₽/мес. при рассрочке на 24 мес.",
        offers: [
            'Все пункты тарифа Beginner',
            'Экспорт истории',
            'Рекомендации по приоритетам'
        ]
    },
    {
        header: "Business",
        apiName: 'business',
        headerTextColor: "white",
        image: "../../../static/svg/svg_homepage/tariffs/computer.svg",
        headerColor: "rgb(0, 0, 0)",
        forWhom: "Для корпоративных клиентов",
        price: "3 700",
        sale: "2 379",
        splitPrice: "",
        offers: [
            'Все пункты тарифа Pro',
            'Безлимитное количество запросов',
            'Приоритетная поддержка'
        ]
    },
    
]