package com.example.flooddetection;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.ArrayList;

class ListViewAdapter extends ArrayAdapter<String> {
    ArrayList<Flood> list;
    Context context;

    public ListViewAdapter(Context context, ArrayList<Flood> items) {
        super(context, R.layout.list_item);
        this.context = context;
        list = items;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        if (convertView == null) {
            LayoutInflater mInflater = (LayoutInflater) context.getSystemService(Activity.LAYOUT_INFLATER_SERVICE);
            convertView = mInflater.inflate(R.layout.list_item, null);
            TextView name = convertView.findViewById(R.id.name);
            name.setText(list.get(position).location);

            TextView date = convertView.findViewById(R.id.datetime);
            name.setText(list.get(position).date);

            TextView severity = convertView.findViewById(R.id.severity);
            name.setText(list.get(position).severity);
        }
        return convertView;
    }

}