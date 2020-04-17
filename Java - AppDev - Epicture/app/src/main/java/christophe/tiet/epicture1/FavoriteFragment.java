package christophe.tiet.epicture1;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.GridView;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import okhttp3.Request;

/**
 * Created by Christophe Tiet
 */
public class FavoriteFragment extends Fragment {

    public static String[] mThumbIds;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View favorite_view =  inflater.inflate(R.layout.fragment_favorite, container, false);
        GridView favoriteGridView = favorite_view.findViewById(R.id.favorite_gridview);
        getImage();
        favoriteGridView.setAdapter(new ImageAdapter(getActivity(), mThumbIds));
        return favorite_view;
    }

    public void getImage() {
        Request _request = Operability.Spliter("getfavImages" , "");
        mThumbIds = Operability._API(_request, "getfavImages");
        Log.v("ImagesOui" , "Oui");
        Log.v("ImagesOui" , mThumbIds[0]);

    }
}

