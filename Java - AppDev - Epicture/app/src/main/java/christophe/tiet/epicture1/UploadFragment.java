package christophe.tiet.epicture1;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.renderscript.ScriptGroup;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStream;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import okhttp3.Request;
import static android.app.Activity.RESULT_OK;

/**
 * Created by Christophe Tiet
 */
public class UploadFragment extends Fragment {
        private static View view;
        private static String path_To_Post;
        private static String binary;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_upload, container, false);
        Button btn_post = view.findViewById(R.id.btn_post);
        Button Btn = view.findViewById(R.id.btn);
        Btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent pickPhoto = new Intent(Intent.ACTION_PICK,
                        android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                startActivityForResult(pickPhoto , 1);//one can be replaced with any action code
            }
        });

        btn_post.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                StartPosting(binary);
            }
        });
        return view;
    }

    public void onActivityResult(int requestCode, int resultCode, Intent imageReturnedIntent) {
        ImageView imageview = view.findViewById(R.id.iv);
        final File file = new File(Environment.getExternalStorageDirectory(), "read.me");
        Uri uri = Uri.fromFile(file);

        super.onActivityResult(requestCode, resultCode, imageReturnedIntent);
        switch(requestCode) {
            case 0:
                if(resultCode == RESULT_OK){
                    Uri selectedImage = imageReturnedIntent.getData();
                    imageview.setImageURI(selectedImage);
                    File auxFile = new File(selectedImage.getPath());
                    path_To_Post = auxFile.getAbsolutePath();
                    Log.v("PathImg", auxFile.getPath());
                    try {
                        final InputStream imageStream = getActivity().getContentResolver().openInputStream(selectedImage);
                        final Bitmap selectedImaged = BitmapFactory.decodeStream(imageStream);
                        String encodedImage = encodeImage(selectedImaged);
                        Log.v("ENCODED" ,  encodedImage);
                        binary = encodedImage;
                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                    }


                    imageview.setImageURI(selectedImage);

                }

                break;
            case 1:
                if(resultCode == RESULT_OK){
                    Uri selectedImage = imageReturnedIntent.getData();
                    imageview.setImageURI(selectedImage);
                    File auxFile = new File(selectedImage.getPath());
                    path_To_Post = auxFile.getAbsolutePath();
                    Log.v("PathImg", auxFile.getPath());
                    try {
                        final InputStream imageStream = getActivity().getContentResolver().openInputStream(selectedImage);
                        final Bitmap selectedImaged = BitmapFactory.decodeStream(imageStream);
                        String encodedImage = encodeImage(selectedImaged);
                        Log.v("ENCODED" ,  encodedImage);
                        binary = encodedImage;
                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                    }

                    //StartPosting(auxFile);
                }
                break;
        }
    }
    private String encodeImage(Bitmap bm)
    {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bm.compress(Bitmap.CompressFormat.PNG,100,baos);
        byte[] b = baos.toByteArray();
        String encImage = Base64.encodeToString(b, Base64.DEFAULT);

        return encImage;
    }

    protected void StartPosting(String b64) {
        Request _request = Operability.Spliter("postImages", b64);
        Operability._API(_request, "postImages");
    }
}

