package com.example.flooddetection;

import androidx.annotation.NonNull;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Criteria;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.ToggleButton;

import com.csvreader.CsvReader;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
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

    public static int params1Height = 551;
    public static int params2Height = 788;
    public static int params3Height = 591;
    public static int params4Height = 517;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setButtons();
        curLoc = getCityName();
        dbWarning();
        readDataLocal();
        btn.setText(getCityName());
        currentLocation.setText("Location: " + getCityName());
        curLoc = getCityName();

        aSwitch.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                if (aSwitch.isChecked()) {
                    readDataGlobal();
                    btn.setText("Global");
                }
                else {
                    readDataLocalSpecific(curLoc);
                    btn.setText(getCityName(curLoc));
                }
            }
        });

        search.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                AlertDialog.Builder alertDialog = new AlertDialog.Builder(MainActivity.this);
                alertDialog.setTitle("Enter a location (City/ZIP/Address):");
                final EditText input = new EditText(MainActivity.this);
                alertDialog.setView(input);
                alertDialog.setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int whichButton) {
                        readDataLocalSpecific(getCityName(input.getText().toString()));
                        curLoc = getCityName(input.getText().toString());
                        btn.setText(getCityName(input.getText().toString()));
                        String temp = getCityName(input.getText().toString());

                        if (temp.length() < 14)
                            currentLocation.setText("Location: " + temp);
                        else
                            currentLocation.setText("Location: " + temp.substring(0,11) + "...");

                        dbWarning();
                        System.out.println("got here");
                    }
                });

                alertDialog.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int whichButton) {
                        // Canceled.
                    }
                });
                alertDialog.show();
            }
        });
    }

    private boolean dbWarning() {
        final boolean[] ret = {false};
        final String loc = curLoc.substring(0, curLoc.indexOf(","));
        DatabaseReference reference = FirebaseDatabase.getInstance().getReference().child("warnings/" + loc);
        reference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull final DataSnapshot dataSnapshot) {
                boolean temp = false;
                for (DataSnapshot snapshot: dataSnapshot.getChildren()) {
                    System.out.println(snapshot.toString());
                    System.out.println(Boolean.parseBoolean("" + snapshot.child("status").getValue()) == true);
                    System.out.println(snapshot.child("status").getValue());
                    if (Boolean.parseBoolean("" + snapshot.child("status").getValue()) == true)
                    {
                        temp = true;
                    }
                }
                warning(temp);
            }
            //vibration if there is a warning
            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
        System.out.println(Arrays.toString(ret));
        return ret[0];
    }

    private void warning (boolean t) {
        boolean test = t;
        ViewGroup.LayoutParams params = floodWarning.getLayoutParams(); //text that says if there is warning or not
        ViewGroup.LayoutParams params1 = box1.getLayoutParams(); //1st box
        ViewGroup.LayoutParams params2 = box2.getLayoutParams(); //2nd box
        ViewGroup.LayoutParams params3 = floodList.getLayoutParams(); //2nd box

        if (test) {
            floodWarning.setText("Emergency Alert: Flood Warning in this area til 6:00 PM EDT. Take shelter now.");
            setMargins(dangerSign,0, 150, 20, 0);
            dangerSign.setImageResource(R.drawable.danger);
            params1.height = params1Height;
            params2.height = params2Height;
            params3.height = params3Height;
            params.height = params4Height;
            System.out.println(params1Height);
            System.out.println(params2Height);
            System.out.println(params3Height);
            System.out.println(params4Height);


        } else {
            params.width = 800;
            params.height = 250;
            params1.height = 300;
            params2.height = params2Height + 280;
            params3.height = params4Height + 280;
            //setMargins(dangerSign,)
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

    public void readDataLocal() {
        final ArrayList<Flood> floods = new ArrayList<>();
        final ArrayList<Flood> preSortFloods = new ArrayList<>();
        final ArrayAdapter adapter = new ArrayAdapter(this, R.layout.old_list_item, floods);
        floodList.setAdapter(adapter);
        final String loc = curLoc.substring(0, curLoc.indexOf(","));
        DatabaseReference reference = FirebaseDatabase.getInstance().getReference().child("past_floods/" + loc);

        reference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull final DataSnapshot dataSnapshot) {
                floods.clear(); preSortFloods.clear();
                for (DataSnapshot snapshot: dataSnapshot.getChildren()) {
                    floods.add(new Flood(loc, snapshot.child("date").getValue().toString()
                            , Double.parseDouble(snapshot.child("latitude").getValue().toString()), Double.parseDouble(snapshot.child("longitude").getValue().toString())
                            , Integer.parseInt(snapshot.child("time").getValue().toString()), Integer.parseInt(snapshot.child("severity").getValue().toString())));
                    FloodSort sort = new FloodSort();
                    Collections.sort(floods, sort);
                    adapter.notifyDataSetChanged();
                }
                adapter.notifyDataSetChanged();
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }

    public void readDataLocalSpecific(final String str) {
        final ArrayList<Flood> floods = new ArrayList<>();
        final ArrayList<Flood> preSortFloods = new ArrayList<>();
        final ArrayAdapter adapter = new ArrayAdapter(this, R.layout.old_list_item, floods);
        floodList.setAdapter(adapter);
        final String loc = curLoc.substring(0, curLoc.indexOf(","));
        DatabaseReference reference = FirebaseDatabase.getInstance().getReference().child("past_floods/" + loc);
        reference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull final DataSnapshot dataSnapshot) {
                floods.clear(); preSortFloods.clear();
                for (DataSnapshot snapshot: dataSnapshot.getChildren()) {
                    System.out.println(curLoc + " " + snapshot.getKey());
                    floods.add(new Flood(loc, snapshot.child("date").getValue().toString()
                            , Double.parseDouble(snapshot.child("latitude").getValue().toString()), Double.parseDouble(snapshot.child("longitude").getValue().toString())
                            , Integer.parseInt(snapshot.child("time").getValue().toString()), Integer.parseInt(snapshot.child("severity").getValue().toString())));
                    FloodSort sort = new FloodSort();
                    Collections.sort(floods, sort);
                    adapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }

    public void readDataGlobal() {
        final ArrayList<Flood> floods = new ArrayList<>();
        final ArrayList<Flood> preSortFloods = new ArrayList<>();
        final ArrayAdapter adapter = new ArrayAdapter(this, R.layout.old_list_item, floods);
        floodList.setAdapter(adapter);
        DatabaseReference reference = FirebaseDatabase.getInstance().getReference().child("past_floods");
        reference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull final DataSnapshot dataSnapshot) {
                floods.clear(); preSortFloods.clear();
                for (final DataSnapshot snapshot: dataSnapshot.getChildren()) {
                    DatabaseReference reference2 = FirebaseDatabase.getInstance().getReference().child("past_floods/" + snapshot.getKey());
                    reference2.addValueEventListener(new ValueEventListener() {

                        @Override
                        public void onDataChange(@NonNull DataSnapshot snap) {
                            for (DataSnapshot snapshot1 : snap.getChildren()) {
                                System.out.println(curLoc + " " + snapshot.getKey());
                                floods.add(new Flood(snapshot.getKey(), snapshot1.child("date").getValue().toString()
                                        , Double.parseDouble(snapshot1.child("latitude").getValue().toString()), Double.parseDouble(snapshot1.child("longitude").getValue().toString())
                                        , Integer.parseInt(snapshot1.child("time").getValue().toString()), Integer.parseInt(snapshot1.child("severity").getValue().toString())));
                                FloodSort sort = new FloodSort();
                                Collections.sort(floods, sort);
                                adapter.notifyDataSetChanged();
                            }
                            adapter.notifyDataSetChanged();
                        }

                        @Override
                        public void onCancelled(@NonNull DatabaseError error) {

                        }
                    });
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
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
}