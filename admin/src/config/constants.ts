export const COMMON = {
    metaData: {
        title: {
            template: process.env.NEXT_PUBLIC_DEFAULT_TITLE_TEMPLATE ?? 'VNPAY',
            default: process.env.NEXT_PUBLIC_DEFAULT_TITLE_VALUE ?? 'VNPAY',
        },
        description:
            process.env.NEXT_PUBLIC_DEFAULT_TITLE_DESCRIPTION ||
            'VNPAY - Cho cuộc sống đơn giản hơn',
    },
    signIn: {
        description: process.env.NEXT_PUBLIC_APP_SIGNIN_DESCRIPTION ?? 'VNPAY',
        ssoUrl: process.env.NEXT_PUBLIC_SSO_URL ?? '',
        ssoRedirectUri: process.env.NEXT_PUBLIC_SSO_REDIRECT_URL ?? '',
        ssoClientId: process.env.NEXT_PUBLIC_SSO_CLIENT_ID ?? '',
        ssoRealm: process.env.NEXT_PUBLIC_SSO_REALM ?? '',
    },
    api: {
        baseUrl: process.env.CORE_API_BASE_URL || 'http://localhost:3000/api',
    },
}
