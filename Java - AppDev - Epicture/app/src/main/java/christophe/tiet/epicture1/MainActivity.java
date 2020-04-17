package christophe.tiet.epicture1;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    private WebView mWebview;
    private String urlToParse;
    private String urlStart = "https://api.imgur.com/oauth2/authorize?client_id=07562cab4d62a76&response_type=token";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        CookieManager.getInstance().removeAllCookies(null);

        mWebview = findViewById(R.id.webView);
        mWebview.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading (WebView view,WebResourceRequest request) {
                Log.v("TEST0", request.getUrl().toString());
                urlToParse = request.getUrl().toString();
                Intent homeActivity = new Intent(MainActivity.this, HomeActivity.class);
                homeActivity.putExtra("ENVOIE_URL", urlToParse);
                startActivity(homeActivity);
                return true;
            }
        });

        mWebview.loadUrl(urlStart);


    }

}
