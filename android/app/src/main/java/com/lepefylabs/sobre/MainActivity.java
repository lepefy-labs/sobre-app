package com.lepefylabs.sobre;

import android.content.Intent;
import android.net.Uri;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(android.os.Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        handleDeepLink(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleDeepLink(intent);
    }

    private void handleDeepLink(Intent intent) {
        if (intent == null) return;
        Uri data = intent.getData();
        if (data == null) return;
        String host = data.getHost();
        if (host == null) return;
        if (!host.equals("www.sobrewellness.app") && !host.equals("sobrewellness.app")) return;

        String url = data.toString();
        getBridge().getWebView().post(() -> getBridge().getWebView().loadUrl(url));
    }
}
