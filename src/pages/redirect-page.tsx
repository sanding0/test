import { useEffect, useState, type FC } from "react";
import { useNavigate, useSearchParams } from "react-router";
import NativeMethods from '../lib/native-bridge'
interface SideEffect {
    action: string
    args: unknown[]
}

interface QueryParams {
    target: string
    before: SideEffect[]
}

const replacements = {
    'go:': '/',
    'open:': '#'
};

export const RedirectPage: FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()

    useEffect(() => {
        const queryParams = searchParams.get("params")

        if (!queryParams) {
            setError('Invalid params');
            navigate('/');
            return;
        }

        try {
            const params: QueryParams = JSON.parse(queryParams);

            if (params.target) {
                handleRedirect(params);
            } else {
                setError('Invalid target');
                navigate('/');
            }
        } catch {
            setError('Invalid params format');
            navigate('/');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleRedirect = (params: QueryParams) => {
        if (params.before) {
            executeBeforeActions(params)
        }

        switch (params.target) {
            case "go:sports": {
                navigate('/sports')
                break
            }
            case "go:promotions": {
                navigate('/promotions')
                break
            }
            case "open:live-chat": {
                navigate('/#live-chat')
                break
            }
            default: navigate('/')
        }

    };


    const executeBeforeActions = (queryParams: QueryParams) => {
        const sideEffects = queryParams.before

        sideEffects.forEach((effect) => {
            if (effect.action === 'call-native') {
                const methodName = effect.args[0] as string
                const target = queryParams.target.replace(/go:|open:/g, match => replacements[match as "go:" | "open:"])
                const params = effect.args.slice(1)

                const callbackParams = params.length
                    ?
                    {
                        ...params
                    }
                    : {
                        target
                    }


                NativeMethods.callNativeMethod(methodName, callbackParams);
            }
        });
    };


    return (
        <>
            {error ? (
                <div>{error}</div>
            ) : (
                <div>Redirecting...</div>
            )}
        </>
    )
}
