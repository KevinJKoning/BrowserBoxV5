import type { Script } from '../script-config';

export const geopandasTestScript: Script = {
	id: "geopandas-test",
	title: "GeoPandas Test",
	description: "Test geopandas functionality progressively to identify issues.",
	filename: "geopandas_test.py",
	category: "Geospatial",
	content: `import fiona # Explicitly import fiona for geopandas I/O fallback
import fastparquet # For parquet suppport
import geopandas as gpd
import pandas as pd
import numpy as np
import os

def test_geopandas():
    """Test geopandas functionality progressively."""
    
    print("Testing GeoPandas functionality...")
    print(f"GeoPandas version: {gpd.__version__}")
    print(f"Fiona version: {fiona.__version__}")
    
    try:
        # Step 1: Basic data creation
        print("\\n1. Creating basic data structures...")
        n_points = 10  # Start small
        np.random.seed(42)
        
        lons = np.random.uniform(-122.5, -122.3, n_points)
        lats = np.random.uniform(37.7, 37.8, n_points)
        print(f"✓ Generated {n_points} coordinate pairs")
        
        # Step 2: Create WKT strings and convert to geometries
        print("\\n2. Creating geometry objects...")
        from shapely import wkt
        points_wkt = [f'POINT({lon} {lat})' for lon, lat in zip(lons, lats)]
        print(f"✓ Created {len(points_wkt)} WKT point strings")
        
        # Convert WKT to actual geometry objects
        geometries = [wkt.loads(point_wkt) for point_wkt in points_wkt]
        print(f"✓ Converted to {len(geometries)} Shapely geometry objects")
        
        # Step 3: Create basic data dictionary
        print("\\n3. Creating data dictionary...")
        point_data = {
            'id': range(1, n_points + 1),
            'name': [f'Location_{i}' for i in range(1, n_points + 1)],
            'geometry': geometries
        }
        print("✓ Created data dictionary with geometry column")
        
        # Step 4: Create GeoDataFrame (this might be where it hangs)
        print("\\n4. Creating GeoDataFrame...")
        gdf_points = gpd.GeoDataFrame(point_data, crs='EPSG:4326')
        print(f"✓ Created GeoDataFrame with {len(gdf_points)} features")
        print(f"✓ CRS: {gdf_points.crs}")
        
        # Step 5: Test basic operations
        print("\\n5. Testing basic operations...")
        print(f"✓ Shape: {gdf_points.shape}")
        print(f"✓ Columns: {list(gdf_points.columns)}")
        print(f"✓ Geometry column: {gdf_points.geometry.name}")
        
        # Step 6: Test simple export using fastparquet engine
        print("\\n6. Testing file export...")
        test_file = "/data/simple_test.parquet"
        gdf_points.to_parquet(test_file, engine='fastparquet')
        print(f"✓ Exported to: {test_file}")
        
        if os.path.exists(test_file):
            size_kb = os.path.getsize(test_file) / 1024
            print(f"✓ File size: {size_kb:.1f} KB")
        
        print("\\n✅ All GeoPandas operations completed successfully!")
        
    except Exception as e:
        print(f"❌ Error at step: {str(e)}")
        import traceback
        traceback.print_exc()
        return False
        
    return True

# Run the test
if __name__ == "__main__":
    result = test_geopandas()
    print(f"\\nTest result: {'SUCCESS' if result else 'FAILED'}")
`
};