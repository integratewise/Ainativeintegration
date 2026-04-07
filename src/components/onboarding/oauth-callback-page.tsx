import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { handleOAuthCallback, getConnectorById } from "./oauth-handler";
import { Button } from "../ui/button";
import { LogoMark } from "../landing/logo";

/**
 * OAuth Callback Page
 * 
 * This page handles the OAuth redirect after user authorization.
 * Flow:
 * 1. User authorizes app on provider's site
 * 2. Provider redirects to /oauth/callback/:connector?code=XXX&state=YYY
 * 3. This page exchanges code for token
 * 4. Stores credentials in Supabase
 * 5. Triggers Creamy sync
 * 6. Redirects to workspace or onboarding
 */

interface OAuthCallbackPageProps {
  connectorId: string;
}

export function OAuthCallbackPage({ connectorId }: OAuthCallbackPageProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const error = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");

      // Handle provider errors
      if (error) {
        setStatus("error");
        setErrorMessage(
          errorDescription || 
          `Authorization failed: ${error}`
        );
        return;
      }

      // Validate required params
      if (!code || !state) {
        setStatus("error");
        setErrorMessage("Missing authorization code or state parameter");
        return;
      }

      try {
        // Exchange code for token and store credentials
        const result = await handleOAuthCallback(code, state, connectorId);

        if (result.success) {
          setStatus("success");
          
          // Redirect to workspace after 2 seconds
          setTimeout(() => {
            navigate("/workspace");
          }, 2000);
        } else {
          setStatus("error");
          setErrorMessage(result.error || "Unknown error occurred");
        }
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err instanceof Error 
            ? err.message 
            : "Failed to complete authorization"
        );
      }
    };

    processCallback();
  }, [searchParams, connectorId, navigate]);

  const connector = getConnectorById(connectorId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F6FA] via-white to-[#F5F6FA] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl border p-12 max-w-md w-full text-center"
      >
        <LogoMark size={60} className="mx-auto mb-6" />

        {status === "processing" && (
          <>
            <Loader2 className="w-12 h-12 animate-spin text-[#3F5185] mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">
              Connecting {connector?.name}...
            </h1>
            <p className="text-muted-foreground text-sm">
              Exchanging authorization code and configuring your integration
            </p>
            
            <div className="mt-8 space-y-2 text-xs text-left text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#3F5185] animate-pulse" />
                <span>Verifying authorization...</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#3F5185] animate-pulse delay-100" />
                <span>Storing credentials securely...</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#3F5185] animate-pulse delay-200" />
                <span>Triggering initial sync (Creamy phase)...</span>
              </div>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
            </motion.div>
            
            <h1 className="text-2xl font-bold mb-2">
              {connector?.name} Connected!
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              Your data will sync in the background. You'll see initial results in about 60 seconds.
            </p>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-left">
              <div className="text-xs text-blue-900 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span className="font-semibold">Phase 1 (Creamy):</span> First value in ~60s
                </div>
                <div className="flex items-center gap-2 text-blue-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Phase 2 (Needed):</span> Selective sync continues
                </div>
                <div className="flex items-center gap-2 text-blue-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Phase 3 (Delta):</span> Real-time updates active
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Redirecting to workspace...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">
              Connection Failed
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              {errorMessage}
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => navigate("/onboarding")}
                className="w-full bg-[#3F5185] hover:bg-[#3F5185]/90"
              >
                Return to Onboarding
              </Button>
              
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="w-full"
              >
                Try Again
              </Button>
            </div>

            <div className="mt-6 p-3 bg-gray-50 rounded-lg text-left">
              <p className="text-xs text-muted-foreground">
                <strong>Common issues:</strong>
              </p>
              <ul className="text-xs text-muted-foreground mt-2 space-y-1 ml-4 list-disc">
                <li>User denied authorization</li>
                <li>Invalid OAuth credentials</li>
                <li>Network connectivity issue</li>
                <li>CSRF state mismatch</li>
              </ul>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
