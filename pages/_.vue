<script>
export default {
  asyncData({ redirect }) {
    return redirect(`/${process.env.AUTH_PATH}`)
  }
}
</script>
