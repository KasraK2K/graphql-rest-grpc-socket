import { IUser } from '../interfaces'

class HtmlGenerator {
    verifyEmail(user: Partial<IUser>): string {
        const verifyUrl = `${process.env.REST_SERVER_ADDRESS}/auth/verify/${user.verify_token}`

        return /* HTML */ `
            <!DOCTYPE html>
            <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
                <head>
                    <meta charset="utf-8" />
                    <meta name="x-apple-disable-message-reformatting" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta
                        name="format-detection"
                        content="telephone=no, date=no, address=no, email=no, url=no"
                    />
                    <meta name="color-scheme" content="light dark" />
                    <meta name="supported-color-schemes" content="light dark" />
                    <!--[if mso]>
                        <noscript>
                            <xml>
                                <o:OfficeDocumentSettings
                                    xmlns:o="urn:schemas-microsoft-com:office:office"
                                >
                                    <o:PixelsPerInch>96</o:PixelsPerInch>
                                </o:OfficeDocumentSettings>
                            </xml>
                        </noscript>
                        <style>
                            td,
                            th,
                            div,
                            p,
                            a,
                            h1,
                            h2,
                            h3,
                            h4,
                            h5,
                            h6 {
                                font-family: 'Segoe UI', sans-serif;
                                mso-line-height-rule: exactly;
                            }
                        </style>
                    <![endif]-->
                    <title>Confirm your email address</title>
                    <style>
                        .hover-important-text-decoration-underline:hover {
                            text-decoration: underline !important;
                        }
                        @media (max-width: 600px) {
                            .sm-my-8 {
                                margin-top: 32px !important;
                                margin-bottom: 32px !important;
                            }
                            .sm-px-4 {
                                padding-left: 16px !important;
                                padding-right: 16px !important;
                            }
                            .sm-px-6 {
                                padding-left: 24px !important;
                                padding-right: 24px !important;
                            }
                            .sm-leading-8 {
                                line-height: 32px !important;
                            }
                        }
                    </style>
                </head>
                <body
                    style="margin: 0; width: 100%; background-color: #f8fafc; padding: 0; -webkit-font-smoothing: antialiased; word-break: break-word"
                >
                    <div style="display: none">
                        Please confirm your email address in order to activate your account.
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                        &#8199;&#65279;&#847; &#8199;&#65279;&#847; &#8199;&#65279;&#847;
                    </div>
                    <div
                        role="article"
                        aria-roledescription="email"
                        aria-label="Confirm your email address"
                        lang="en"
                    >
                        <div
                            class="sm-px-4"
                            style="background-color: #f8fafc; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
                        >
                            <table align="center" cellpadding="0" cellspacing="0" role="none">
                                <tr>
                                    <td style="width: 552px; max-width: 100%">
                                        <div
                                            class="sm-my-8"
                                            style="margin-top: 48px; margin-bottom: 48px; text-align: center"
                                        >
                                            <a href="https://example.com">
                                                <img
                                                    src="https://news.ufl.edu/media/newsufledu/images/2022/06/wisdom-story1-1.jpg"
                                                    width="150"
                                                    height="150"
                                                    alt="wisdom"
                                                    style="max-width: 100%; vertical-align: middle; line-height: 1; border: 0; border-radius: 9999px; object-fit: cover"
                                                />
                                            </a>
                                        </div>
                                        <table
                                            style="width: 100%;"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="none"
                                        >
                                            <tr>
                                                <td
                                                    class="sm-px-6"
                                                    style="border-radius: 4px; background-color: #fff; padding: 48px; font-size: 16px; color: #334155; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                                                >
                                                    <h1
                                                        class="sm-leading-8"
                                                        style="margin: 0 0 24px; font-size: 24px; font-weight: 600; color: #000"
                                                    >
                                                        Hello,
                                                    </h1>
                                                    <p style="margin: 0; line-height: 24px">
                                                        We are pleased to have you here.
                                                        <br />
                                                        <br />
                                                        Please confirm your email address by
                                                        clicking the button below:
                                                    </p>
                                                    <div role="separator" style="line-height: 24px">
                                                        &zwj;
                                                    </div>
                                                    <div>
                                                        <a
                                                            href="${verifyUrl}"
                                                            style="display: inline-block; border-radius: 4px; background-color: #334155; padding: 16px 24px; font-size: 16px; font-weight: 600; line-height: 1; color: #f8fafc; text-decoration: none"
                                                        >
                                                            <!--[if mso]>
                                                                <i
                                                                    style="mso-font-width: -100%; letter-spacing: 32px; mso-text-raise: 30px"
                                                                    hidden
                                                                    >&nbsp;</i
                                                                >
                                                            <![endif]-->
                                                            <span style="mso-text-raise: 16px">
                                                                Confirm email address &rarr;
                                                            </span>
                                                            <!--[if mso]>
                                                                <i
                                                                    style="mso-font-width: -100%; letter-spacing: 32px;"
                                                                    hidden
                                                                    >&nbsp;</i
                                                                >
                                                            <![endif]-->
                                                        </a>
                                                    </div>
                                                    <div
                                                        role="separator"
                                                        style="background-color: #e2e8f0; height: 1px; line-height: 1px; margin: 32px 0"
                                                    >
                                                        &zwj;
                                                    </div>
                                                    <p style="margin: 0;">
                                                        If you didn't sign up for Wisdom, you can
                                                        safely ignore this email.
                                                        <br />
                                                        <br />
                                                        Thanks, <br />The Wisdom Team
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr role="separator">
                                                <td style="line-height: 48px">&zwj;</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style="padding-left: 24px; padding-right: 24px; text-align: center; font-size: 12px; color: #475569"
                                                >
                                                    <p
                                                        style="margin: 0 0 16px; text-transform: uppercase"
                                                    >
                                                        Copyright by Wisdom
                                                    </p>
                                                    <p style="margin: 0; font-style: italic">
                                                        Write your slogan here
                                                    </p>
                                                    <p style="cursor: default">
                                                        <a
                                                            href="https://example.com/docs/"
                                                            class="hover-important-text-decoration-underline"
                                                            style="color: #4338ca; text-decoration: none"
                                                            >Docs</a
                                                        >
                                                        &bull;
                                                        <a
                                                            href="https://github.com/Kasra_K2K"
                                                            class="hover-important-text-decoration-underline"
                                                            style="color: #4338ca; text-decoration: none;"
                                                            >Github</a
                                                        >
                                                        &bull;
                                                        <a
                                                            href="https://twitter.com/imensite"
                                                            class="hover-important-text-decoration-underline"
                                                            style="color: #4338ca; text-decoration: none;"
                                                            >Twitter</a
                                                        >
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </body>
            </html>
        `
    }
}

export default new HtmlGenerator()
