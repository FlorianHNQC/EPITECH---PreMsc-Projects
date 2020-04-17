package christophe.tiet.epicture1;
import christophe.tiet.epicture1.Operability;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import android.graphics.Path;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.Map;

public class HomeActivity extends AppCompatActivity {

    protected String urlToParse;
    public static String[] mThumbIds;
    private static Map<String,String> tokens_;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        BottomNavigationView bottomNav = findViewById(R.id.activity_home_bottom_navigation);
        bottomNav.setOnNavigationItemSelectedListener(navLister);
        urlToParse = getIntent().getExtras().getString("ENVOIE_URL");
        Log.v("URL1caca",urlToParse);

        Operability._QueryList(urlToParse);
        tokens_ = Operability.getTokens();
        Log.v("OUIOUI" , getToken("access_token"));
        Log.v("OUIOUI" , tokens_.toString());

    }
    public static String getToken(String key) {
        return tokens_.get(key);
    }
    private BottomNavigationView.OnNavigationItemSelectedListener navLister =
            new BottomNavigationView.OnNavigationItemSelectedListener() {
                @Override
                public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
                    Fragment selectedFragment = null;

                    switch (menuItem.getItemId()) {
                        case R.id.action_home:
                            selectedFragment = new HomeFragment();
                            break;
                        case R.id.action_gallery:
                            selectedFragment = new GalleryFragment();

                            break;
                        case R.id.action_favorite:
                            selectedFragment = new FavoriteFragment();
                            break;
                        case R.id.action_search:
                            selectedFragment = new SearchFragment();
                            break;
                        case R.id.action_upload:
                            selectedFragment = new UploadFragment();
                            break;
                    }

                    getSupportFragmentManager().beginTransaction().replace(R.id.activity_home_frame_layout, selectedFragment).commit();

                    return true;
                }
            };
}
