#!/bin/bash

# Ministry Official Colors
# Primary Blue: #1e3a8a (headers, titles)
# Dark Green: #008000 (navigation, success)
# Light Green: #32cd32 (accents, highlights)
# Gold: #ffd700 (warnings, important)
# Sky Blue: #1e90ff (info, secondary actions)

echo "🎨 Standardizing colors to Ministry scheme..."

cd /home/user/webapp/public/static

# Replace purple/violet colors with Ministry blue
find . -name "*.js" -type f -exec sed -i 's/#9333ea/#1e3a8a/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#a855f7/#1e3a8a/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#8b5cf6/#1e3a8a/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#7c3aed/#1e3a8a/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#6d28d9/#1e3a8a/g' {} \;

# Replace pink colors with light green
find . -name "*.js" -type f -exec sed -i 's/#ec4899/#32cd32/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#f472b6/#32cd32/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#ff69b4/#32cd32/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#db2777/#32cd32/g' {} \;

# Replace cyan colors with sky blue
find . -name "*.js" -type f -exec sed -i 's/#06b6d4/#1e90ff/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#0891b2/#1e90ff/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#22d3ee/#1e90ff/g' {} \;

# Replace indigo colors with primary blue  
find . -name "*.js" -type f -exec sed -i 's/#6366f1/#1e3a8a/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#4f46e5/#1e3a8a/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#4338ca/#1e3a8a/g' {} \;

# Replace orange colors with gold
find . -name "*.js" -type f -exec sed -i 's/#f97316/#ffd700/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#fb923c/#ffd700/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#ea580c/#ffd700/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#ff8c00/#ffd700/g' {} \;

# Standardize green colors
find . -name "*.js" -type f -exec sed -i 's/#10b981/#32cd32/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#22c55e/#32cd32/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#059669/#008000/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#16a34a/#008000/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#15803d/#008000/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#166534/#008000/g' {} \;

# Red colors (keep for errors/alerts)
# Blue colors - standardize to primary or sky blue
find . -name "*.js" -type f -exec sed -i 's/#3b82f6/#1e90ff/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#2563eb/#1e3a8a/g' {} \;
find . -name "*.js" -type f -exec sed -i 's/#1d4ed8/#1e3a8a/g' {} \;

echo "✅ Color standardization complete!"
echo ""
echo "Ministry Color Scheme:"
echo "  🔵 Primary Blue: #1e3a8a (headers, titles)"
echo "  🟢 Dark Green: #008000 (navigation, success)"
echo "  🟢 Light Green: #32cd32 (accents, highlights)"
echo "  🟡 Gold: #ffd700 (warnings, important)"
echo "  🔵 Sky Blue: #1e90ff (info, secondary)"
