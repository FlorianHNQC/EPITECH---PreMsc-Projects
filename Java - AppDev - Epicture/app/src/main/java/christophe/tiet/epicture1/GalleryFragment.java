package christophe.tiet.epicture1;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.GridView;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;

/**
 * Created by Christophe Tiet
 */
public class GalleryFragment extends Fragment {

    public static String[] mThumbIds;


    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View gallery_view =  inflater.inflate(R.layout.fragment_gallery, container, false);
        GridView galleryGridView = gallery_view.findViewById(R.id.gallery_gridview);
        getImage();
        galleryGridView.setAdapter(new ImageAdapter(getActivity(), mThumbIds));
        return gallery_view;
    }

    public void getImage() {
        Request _request = Operability.Spliter("getImages" , "");
       mThumbIds = Operability._API(_request, "getImages");
       Log.v("ImagesOui" , "Oui");
       Log.v("ImagesOui" , mThumbIds.toString());

    }
}
