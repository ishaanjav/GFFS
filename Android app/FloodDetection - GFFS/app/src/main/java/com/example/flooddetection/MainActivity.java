package com.example.flooddetection;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.Switch;
import android.widget.TextView;

import java.io.IOException;
import java.util.List;
import java.util.Locale;


public class MainActivity extends AppCompatActivity {

    private static final int MY_PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION = 1;

    TextView currentLocation;
    TextView floodWarning;
    ImageView dangerSign;
    CardView box1;
    CardView box2;
    TextView btn;
    ListView floodList;
    ImageView search;
    String curLoc;
    Switch aSwitch;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setButtons();
        warning();
    }

    private void setButtons() {
        currentLocation = findViewById(R.id.city);
        floodWarning = findViewById(R.id.warning);
        dangerSign = findViewById(R.id.image);
        box1 = findViewById(R.id.box1);
        box2 = findViewById(R.id.box2);
        btn = findViewById(R.id.btn);
        floodList = findViewById(R.id.listView);
        search = findViewById(R.id.search);
        aSwitch = findViewById(R.id.aswitch);
    }

    private String getCityName() {
        try {
            double loc[] = getLocation();
            Geocoder gcd = new Geocoder(this, Locale.getDefault());
            List<Address> addresses = gcd.getFromLocation(loc[0], loc[1], 1);
            if (addresses.size() > 0) {
                curLoc = addresses.get(0).getLocality() + ", " + addresses.get(0).getAdminArea();
                return addresses.get(0).getLocality() + ", " + addresses.get(0).getAdminArea();
            }
        }
        catch (IOException e) {
            return "Current Location";
        }
        return "Current Location";
    }

    private String getCityName(String location)
    {
        try {
            Geocoder gcd = new Geocoder(this, Locale.getDefault());
            List<Address> addresses = gcd.getFromLocationName(location, 1);
            if (addresses.size() > 0) {
                //currentLocation.setText("Location: " + getCityName(location));
                //System.out.println(addresses.get(0).getLocality() + ", " + addresses.get(0).getAdminArea());
                double latitude = addresses.get(0).getLatitude();
                double longitude = addresses.get(0).getLongitude();
                currentLocation.setText("Location: " + addresses.get(0).getLocality() + ", " + addresses.get(0).getAdminArea());
                btn.setText(addresses.get(0).getLocality() + ", " + addresses.get(0).getAdminArea());
                //btn.setText(addresses.get(0).getLocality() + ", " + addresses.get(0).getAdminArea());
                curLoc = addresses.get(0).getLocality() + ", " + addresses.get(0).getAdminArea();
                return addresses.get(0).getLocality() + ", " + addresses.get(0).getAdminArea();
            }
        }
        catch (IOException e) {
            return "Current Location";
        }
        return "Current Location";
    }

    private double[] getLocation() {
        LocationManager lm = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.ACCESS_FINE_LOCATION}, MY_PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION);
            return null;
        }
        Location location = lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);
        if (location != null) {
            System.out.println(location.toString());
            double longitude = location.getLongitude();
            double latitude = location.getLatitude();
            return new double[]{latitude, longitude};
        }
        else {
            return new double[] {33.0198, 96.6989};
        }
    }

    private void warning() {
        boolean test = false; //TODO code the logic that will make this true or false accordingly.
        ViewGroup.LayoutParams params = floodWarning.getLayoutParams(); //text that says if there is warning or not
        ViewGroup.LayoutParams params1 = box1.getLayoutParams(); //1st box
        ViewGroup.LayoutParams params2 = box2.getLayoutParams(); //2nd box
        ViewGroup.LayoutParams params3 = floodList.getLayoutParams(); //2nd box

        if (test) {
            floodWarning.setText("Emergency Alert: Flood Warning in this area til 6:00 PM EDT. Take shelter now.");
            setMargins(dangerSign,0, 140, 20, 0);
        } else {
            params.width = 800;
            params.height = 250;
            params1.height = 300;
            params2.height += 280;
            params3.height += 280;
            //LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
            //dangerSign.setLayoutParams(lp);
            dangerSign.setImageResource(R.drawable.greenche);
            floodWarning.setText("No Warnings.    ");
        }
    }

    public static void setMargins (View v, int l, int t, int r, int b) {
        if (v.getLayoutParams() instanceof ViewGroup.MarginLayoutParams) {
            ViewGroup.MarginLayoutParams p = (ViewGroup.MarginLayoutParams) v.getLayoutParams();
            p.setMargins(l, t, r, b);
            v.requestLayout();
        }
    }

}