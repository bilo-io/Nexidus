

# #region Tree
echo "
===========================================
Brew: Installing 'tree'
-------------------------------------------
"
brew install tree

tree --version
# #endregion

# #region Docker
brew install docker --cask
# #endregion

# #region Tilt
echo "
===========================================
Brew: Installing 'tilt'
-------------------------------------------
"

brew install tilt-dev/tap/tilt

tilt version
# #endregion